import React, { useEffect, useRef } from 'react';

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        new (window as any).YT.Player(playerRef.current, {
          height: '390',
          width: '100%',
          videoId,
        });
      }
    };

    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      delete (window as any).onYouTubeIframeAPIReady;
    };
  }, [videoId]);

  return <div ref={playerRef}></div>;
};

export default YouTubePlayer;
