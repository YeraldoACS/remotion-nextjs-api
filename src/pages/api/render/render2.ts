import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import os from "os";
import fs from "fs";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { v4 as uuidv4 } from "uuid";
import { renderProgressMap } from "@app/src/lib/render-progress";
import { VideoData } from "@app/src/lib/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  try {
    const videoData: VideoData = req.body.videoData;
    const compositionId = "dynamic-template";
    const renderId = uuidv4();
    
    // Initialize progress tracking
    renderProgressMap[renderId] = {
      renderedFrames: 0,
      totalFrames: 0, // We don't know yet
      startTime: Date.now(),
      isDone: false,
    };

    // Return the renderId immediately
    res.status(200).json({ success: true, renderId });

    // Start rendering process asynchronously
    startRenderProcess(renderId, videoData, compositionId).catch((err) => {
      console.error(`[render2] Render process error:`, err);
      renderProgressMap[renderId].error = err.message;
      renderProgressMap[renderId].isDone = true;
    });
  } catch (err: any) {
    console.error("[RENDER ERROR]", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

// This function runs after responding to the client
async function startRenderProcess(renderId: string, videoData: VideoData, compositionId: string) {
  console.log(`[startRenderProcess] Starting for ${renderId}`);

  try {
    const REMOTION_PATH = path.resolve("./src/remotion/index.ts");
    // 1. Bundle Remotion project
    const bundleLocation = await bundle({
      entryPoint: REMOTION_PATH,
      webpackOverride: (config) => config,
    });

    // 2. Select Composition
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps: { videoData },
    });

    // Update total frames now that we know it
    if (renderProgressMap[renderId]) {
      renderProgressMap[renderId].totalFrames = composition.durationInFrames;
    }

    // 3. Define temp output path
    const tempOut = path.join(os.tmpdir(), `${uuidv4()}.mp4`);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: tempOut,
      inputProps: { videoData },
      frameRange:  [0, videoData.duration - 1],
      concurrency: 4,
      audioCodec: "aac",
      videoBitrate: "1000k",
      imageFormat: "jpeg",
      hardwareAcceleration: "if-possible",
      onProgress: ({ renderedFrames }) => {
        if (renderProgressMap[renderId]) {
          renderProgressMap[renderId].renderedFrames = renderedFrames;
        }
      },
    });

    // 4. Render video
    const outputFileName = `${uuidv4()}.mp4`;
    const outputPublicPath = path.join(process.cwd(), "public", "renders", outputFileName);
    fs.mkdirSync(path.dirname(outputPublicPath), { recursive: true });
    fs.renameSync(tempOut, outputPublicPath);

    // Update progress map with URL and completion status
    const publicUrl = `/renders/${outputFileName}`;

    if (renderProgressMap[renderId]) {
      renderProgressMap[renderId].isDone = true;
      renderProgressMap[renderId].outputUrl = publicUrl; // Add this to your RenderProgress interface
    }
  } catch (err: any) {
    console.error("[RENDER ERROR]", err);
    // Update progress map with error
    if (renderProgressMap[renderId]) {
      renderProgressMap[renderId].error = err.message; // Add this to your RenderProgress interface
      renderProgressMap[renderId].isDone = true;
    }
  }
}
