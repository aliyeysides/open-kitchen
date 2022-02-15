import { useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import 'video.js/dist/video-js.css';
import { Recipe, RecipeStep } from '../../types';
import { GET_RECIPE } from './constants';
import Box from '@mui/material/Box';
import VerticalTabs, {
  VerticalTabsOnClick,
} from '../../components/VerticalTabs';
import YouTubePlayer, { YouTubeOptions } from '../../components/YouTubePlayer';
import { useRef, useState } from 'react';

function ytattrs(start: number): YouTubeOptions {
  return {
    width: '1024',
    height: '576',
    playerVars: {
      autoplay: 1,
      start,
      origin: 'http://localhost:3000',
    },
  };
}

type Step = Pick<RecipeStep, 'order' | 'startTime'>;

export default function RecipePage() {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState<Step>({
    order: 0,
    startTime: 0,
  });
  const playerRef = useRef<any>({});

  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: {
      id: params.recipeId,
    },
  });

  const handleTabClick: VerticalTabsOnClick = (step, e) => {
    setCurrentStep({
      order: step.order,
      startTime: step.startTime,
    });
    playerRef.current.seekTo(step.startTime);
  };

  const handleReady = (e: any) => {
    playerRef.current = e.target;
  };

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const recipe: Recipe = data?.recipe;

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
            <YouTubePlayer
              videoId={recipe.ytId}
              opts={{ ...ytattrs(currentStep.startTime) }}
              onReady={handleReady}
            />
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
