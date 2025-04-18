"use-client";
import { Player } from "@remotion/player";
import { CollegeBasketball as VideoContainer } from "./VideoContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { VideoData } from "@app/src/lib/types";

interface VideoPlayerProps {
  videoData: VideoData;
  compositionId: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoData, compositionId }) => {
  return (
    <div className="video-player-container flex flex-col justify-center items-center">
      <Player
        acknowledgeRemotionLicense
        component={VideoContainer}
        inputProps={{ videoData, baseFPS: 30, compositionId }}
        durationInFrames={videoData.duration}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        controls
        className="rounded-3"
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
        }}
      />
    </div>
  );
};
