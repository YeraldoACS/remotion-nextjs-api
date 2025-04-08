// components/RenderButton.tsx
'use client';

import { useState } from 'react';
import { VideoData } from '@app/src/data/mockData';

interface RenderButtonProps {
  videoData: VideoData;
}

export const RenderButton: React.FC<RenderButtonProps> = ({ videoData }) => {
  const [isRendering, setIsRendering] = useState(false);
  const [renderUrl, setRenderUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRender = async () => {
    setIsRendering(true);
    setRenderUrl(null);
    setError(null);

    try {
      const res = await fetch('/api/render/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoData }),
      });
      console.log("🚀 ~ handleRender ~ res:", res)

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Render failed');

      setRenderUrl(json.url);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="render-controls mt-4">
      <button
        onClick={handleRender}
        disabled={isRendering}
        className="render-button btn btn-primary"
      >
        {isRendering ? 'Rendering...' : 'Render Video'}
      </button>

      {renderUrl && (
        <p className="render-success">
          ✅ Render complete! <a href={renderUrl} download>Download</a>
        </p>
      )}
      {error && <p className="render-error">❌ {error}</p>}
    </div>
  );
};
