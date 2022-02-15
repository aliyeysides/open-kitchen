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

export default function RecipePage() {
  const params = useParams();

  // below: https://developers.google.com/youtube/player_parameters
  const [YTOptions, setYTOptions] = useState<YouTubeOptions>({
    width: '1024',
    height: '576',
    playerVars: {
      autoplay: 1,
      start: 1,
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

  const handleTabClick: VerticalTabsOnClick = (step, e) => {
    setYTOptions({
      width: '1024',
      height: '576',
      playerVars: {
        autoplay: 1,
        start: step.startTime,
        origin: 'http://localhost:3000',
      },
    });
  };

  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Box>
          {recipe.ytId ? (
            <YouTubePlayer videoId={recipe.ytId} opts={YTOptions} />
          ) : null}
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
