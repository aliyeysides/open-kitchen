import YouTube, { Options, YouTubeProps } from 'react-youtube';

export type YouTubeOptions = Options;

export default function YouTubePlayer(props: YouTubeProps): JSX.Element {
  return <YouTube {...props} />;
}
