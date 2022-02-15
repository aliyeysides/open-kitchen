import YouTube, { Options, YouTubeProps } from 'react-youtube';

export type YouTubeOptions = Options;

export default function YouTubePlayer(props: YouTubeProps): JSX.Element {
  const handleOnReady = (event: any) => {
    console.log('yt player ready::');
  };

  return <YouTube {...props} onReady={handleOnReady} />;
}
