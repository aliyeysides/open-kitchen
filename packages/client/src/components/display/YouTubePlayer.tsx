import { ForwardedRef, forwardRef } from 'react';
import YouTube, { Options, YouTubeProps } from 'react-youtube';

export type YouTubeOptions = Options;
export type PlayerType = ReturnType<YouTube['getInternalPlayer']>;
export type PlayerEvent = { target: PlayerType; data: number };

function YouTubePlayer(
  props: YouTubeProps,
  ref: ForwardedRef<any>,
): JSX.Element {
  return <YouTube ref={ref} {...props} />;
}

export default forwardRef(YouTubePlayer);
