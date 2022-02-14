import { useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import 'video.js/dist/video-js.css';
import { Recipe } from '../../types';
import { GET_RECIPE } from './constants';
import Box from '@mui/material/Box';
import VerticalTabs, {
  VerticalTabsOnClick,
} from '../../components/VerticalTabs';
import YouTubePlayer, { YouTubeOptions } from '../../components/YouTubePlayer';
import { useState } from 'react';

// TODO: implement our own playback
// import VideoJS from '../../components/VideoJS';
// import videojs from 'video.js';

// TODO: A/B test best "stepper"
// import VerticalLinearStepper from "../../components/VerticalLinearStepper";

interface RecipePageProps {
  previewId?: string;
}

export default function RecipePage({ previewId }: RecipePageProps) {
  const params = useParams();
  const [YTOptions, setYTOptions] = useState<YouTubeOptions>({
    width: '1024',
    height: '576',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: 17,
      end: 30,
    },
  });

  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: {
      id: params.recipeId,
    },
  });

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const recipe: Recipe = data?.recipe;

  // Commented code below is for custom VideoJS playback
  // const videoUpload: VideoUpload = data?.recipe.video;

  // const videoJsOptions: videojs.PlayerOptions = {
  //   autoplay: true,
  //   controls: true,
  //   responsive: true,
  //   fluid: false,
  //   fill: true,
  //   sources: [
  //     {
  //       src: videoUpload.url,
  //       type: 'video/mp4',
  //     },
  //   ],
  // };

  // const handlePlayerReady = () => {
  //   videojs.log('Your player is ready!');
  // };

  const handleTabClick: VerticalTabsOnClick = (step, e) => {
    console.log('step::', step);
    setYTOptions({
      width: '1024',
      height: '576',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        start: step.startTime,
        end: 30,
      },
    });
  };

  const gordan_ramsay_spicy_sausage_id = 'FP6E3JtmsCE';
  // const options: YouTubeOptions = {
  //   width: '1024',
  //   height: '576',
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //     start: 17,
  //     end: 30,
  //   },
  // };

  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Box>
          <YouTubePlayer
            videoId={gordan_ramsay_spicy_sausage_id}
            opts={YTOptions}
          />
          {/* <iframe
            width="1024"
            height="576"
            src={`https://www.youtube.com/embed/FP6E3JtmsCE?enablejsapi=1&origin=${
              window.location.href
            }&autoplay=${1}&start=${17}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          <Box
            sx={{
              display: 'flex',
              my: 2,
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            {recipe.name}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Box sx={{ ml: 3 }}>$5 per serving</Box>
            <Box sx={{ ml: 3 }}>700 Calories per serving</Box>
            <Button sx={{ ml: 3 }} color="primary" variant="contained">
              Order Now
            </Button>
          </Box>
        </Box>
        <VerticalTabs onClick={handleTabClick} recipe={recipe} />
      </Box>
    </main>
  );
}
