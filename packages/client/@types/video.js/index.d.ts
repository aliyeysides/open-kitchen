import * as React from 'react';
import 'video.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'video-js': React.DetailedHTMLProps<
        React.VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
      >;
      track: React.DetailedHTMLProps<
        React.TrackHTMLAttributes<HTMLTrackElement>,
        HTMLTrackElement
      >;
    }
  }
}

declare module 'video.js' {
  const VideoTrack: any;
  interface VideoJsPlayer {
    videoTracks(): any;
  }
}
