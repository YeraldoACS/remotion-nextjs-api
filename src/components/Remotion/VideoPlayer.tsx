"use-client";
import { Player } from "@remotion/player";
import { CollegeBasketball as VideoContainer } from "./VideoContainer";
import { RenderButton } from "@app/src/components/Remotion/RenderButton";
import { VideoData } from "@app/src/data/mockData";

interface VideoPlayerProps {
  videoData: VideoData;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoData }) => {
  return (
    <div className="video-player-container flex flex-col justify-center items-center">
      <Player
        acknowledgeRemotionLicense
        component={VideoContainer}
        inputProps={{ videoData }}
        durationInFrames={videoData.duration}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        controls
        style={{
          width: "100%",
          maxWidth: "800px",
          aspectRatio: "16 / 9",
        }}
      />
      <RenderButton videoData={videoData} />
    </div>
  );
};
