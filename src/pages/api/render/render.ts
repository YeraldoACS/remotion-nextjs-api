// pages/api/render.ts
import { NextApiRequest, NextApiResponse } from "next";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import os from "os";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { videoData } = req.body;
    const compositionId = "my-video";

    const REMOTION_PATH = path.resolve("./src/remotion/index.ts");
    console.log("🚀 ~ handler ~ REMOTION_PATH:", REMOTION_PATH);
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
    // 3. Define temp output path
    const tempOut = path.join(os.tmpdir(), `${uuidv4()}.mp4`);
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: tempOut,
      inputProps: { videoData },
    });
    // 4. Render video
    const outputFileName = `${uuidv4()}.mp4`;
    const outputPublicPath = path.join(process.cwd(), "public", "renders", outputFileName);
    fs.mkdirSync(path.dirname(outputPublicPath), { recursive: true });
    fs.renameSync(tempOut, outputPublicPath);
    // 5. Move to public/renders folder
    const publicUrl = `/renders/${outputFileName}`;
    return res.status(200).json({ success: true, url: publicUrl });
  } catch (err: any) {
    console.error("Render error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
