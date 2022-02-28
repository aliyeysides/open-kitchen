import YouTube, { Options, YouTubeProps } from 'react-youtube';

export type YouTubeOptions = Options;
export type PlayerType = ReturnType<YouTube['getInternalPlayer']>;
export type PlayerEvent = { target: PlayerType; data: number };

export default function YouTubePlayer(props: YouTubeProps): JSX.Element {
  return <YouTube {...props} />;
}
