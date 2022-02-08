import YouTube, { YouTubeProps } from 'react-youtube';

export default function YouTubePlayer(props: YouTubeProps) {
  return <YouTube {...props} />;
}
