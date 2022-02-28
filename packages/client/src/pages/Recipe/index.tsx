import { useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import 'video.js/dist/video-js.css';
import { Recipe, RecipeStep } from '../../types';
import { GET_RECIPE } from './constants';
import Box from '@mui/material/Box';
import VerticalTabs, {
  VerticalTabsOnClick,
} from '../../components/navigation/VerticalTabs';
import YouTubePlayer, {
  PlayerEvent,
  YouTubeOptions,
} from '../../components/display/YouTubePlayer';
import { useEffect, useRef, useState } from 'react';
import IngredientsTable from '../../components/display/IngredientsTable';

function ytattrs(): YouTubeOptions {
  return {
    width: '1024',
    height: '576',
    playerVars: {
      autoplay: 1,
      origin: 'http://localhost:3000',
    },
  };
}

type Step = Pick<RecipeStep, 'order' | 'startTime'>;

export function getStepTabIndex(currentTime: number, data: Step[]): number {
  return data.reduce((acc, val) => {
    if (currentTime >= val.startTime) {
      return val.order - 1;
    }
    return acc;
  }, 0);
}

export default function RecipePage() {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const playerRef = useRef<any>({ seekTo: (time: number) => time });

  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: {
      id: params.recipeId,
    },
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current.getCurrentTime) {
        const time = await playerRef.current.getCurrentTime();
        if (data) {
          setCurrentStep(getStepTabIndex(time, data.recipe.steps));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playerRef, data]);

  const handleTabClick: VerticalTabsOnClick = (step, e) => {
    playerRef.current.seekTo(step.startTime);
  };

  const handleOnReady = async (e: PlayerEvent) => {
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
              opts={{ ...ytattrs() }}
              onReady={handleOnReady}
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
          <Box>
            <IngredientsTable
              header="Ingredients"
              ingredients={recipe.ingredients}
            />
          </Box>
        </Box>
        <VerticalTabs
          onClick={handleTabClick}
          steps={recipe.steps}
          current={currentStep}
        />
      </Box>
    </main>
  );
}
