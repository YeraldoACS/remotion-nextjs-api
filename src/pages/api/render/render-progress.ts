import { NextApiRequest, NextApiResponse } from "next";
import { renderProgressMap } from "@app/src/lib/render-progress";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { renderId } = req.query;
  console.log("🚀 ~ handler ~ renderId:", renderId)

  if (!renderId || typeof renderId !== "string") {
    res.status(400).end("Missing renderId");
    return;
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  res.write("\n"); // Force headers to be sent immediately

  const sendProgress = () => {
    const progress = renderProgressMap[renderId];
    if (!progress) return;

    const { renderedFrames, totalFrames, startTime, isDone } = progress;
    const elapsed = Date.now() - startTime;
    const eta = renderedFrames === 0 ? 0 : (elapsed / renderedFrames) * totalFrames - elapsed;

    const payload = {
      renderedFrames,
      totalFrames,
      elapsed,
      eta,
      isDone,
      outputUrl: progress.outputUrl,
      error: progress.error,
    };

    res.write(`data: ${JSON.stringify(payload)}\n\n`);

    if (isDone) {
      clearInterval(interval);
      res.end();
    }
  };

  const interval = setInterval(sendProgress, 500);
  sendProgress(); // initial event immediately

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
}
