// src/lib/render-progress.ts
export interface RenderProgress {
  renderedFrames: number;
  totalFrames: number;
  startTime: number;
  isDone: boolean;
  outputUrl?: string;
  error?: string;
}

// Use global namespace to ensure single instance
declare global {
    var renderProgressMap: Record<string, RenderProgress>;
  }
  
  // Initialize if not exists
  if (!global.renderProgressMap) {
    global.renderProgressMap = {};
  }
  
  export const renderProgressMap = global.renderProgressMap;