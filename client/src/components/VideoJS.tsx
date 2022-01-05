import { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import "video.js/dist/video-js.css";

interface VideoJSProps {
  options: videojs.PlayerOptions;
  onReady?: videojs.ReadyCallback;
}

export default function VideoJS(props: VideoJSProps) {
  const { options, onReady } = props;
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const playerRef = useRef<null | VideoJsPlayer>(null);
  const videojs_: any = videojs;

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs_(
        videoElement,
        options,
        () => {
          onReady && onReady.apply(player);
        }
      ));

      // Create a track object.
      //   const track = new videojs_.VideoTrack({
      //     id: "my-alternate-video-track",
      //     kind: "caption",
      //     label: "Director's Commentary",
      //     language: "en",
      //     src: "../video-track.vtt",
      //   });

      //   const track2 = new videojs_.VideoTrack({
      //     id: "my-alternate-video-track-2",
      //     kind: "caption",
      //     label: "Director's Commentary",
      //     language: "en",
      //   });

      //   const track3 = player
      //     .videoTracks()
      //     .getTrackById("my-alternate-video-track");

      // console.log("player:", player);

      // Add the track to the player's video track list.
      //   player.videoTracks().addTrack(track);
      //   player.videoTracks().addTrack(track2);

      // Get the current player's VideoTrackList object.
      //   const videoTrackList = player.videoTracks();
      //   console.log("videoTrackList:", videoTrackList);
      //   // Listen to the "change" event.
      //   videoTrackList.addEventListener("change", function () {
      //     // Log the currently enabled VideoTrack label.
      //     for (let i = 0; i < videoTrackList.length; i++) {
      //       const track = videoTrackList[i];

      //       if (track.enabled) {
      //         videojs.log("track changed:::", track.label);
      //         return;
      //       }
      //     }
      //   });
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current;
    }
  }, [options, onReady, videojs_]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video-js ref={videoRef} className="vjs-big-play-centered">
        <track
          src="https://s3.amazonaws.com/demo.jwplayer.com/text-tracks/assets/chapters.vtt"
          kind="chapters"
          srcLang="en"
          label="English"
          default
        />
      </video-js>
    </div>
  );
}
