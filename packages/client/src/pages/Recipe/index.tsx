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
import { createRef, useEffect, useRef, useState } from 'react';
import IngredientsTable from '../../components/display/IngredientsTable';

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

function getStep(currentTime: number, data: Step[]): Step {
  return data.reduce(
    (acc, val) => {
      // console.log('acc', acc, 'val', val);
      console.log(
        'currentTime',
        currentTime,
        'val.startTime',
        val.startTime,
        '>?',
        currentTime > val.startTime,
      );
      if (currentTime > val.startTime) {
        return { startTime: val.startTime, order: val.order };
      }
      return acc;
    },
    { startTime: 0, order: 0 },
  );
}

export default function RecipePage() {
  const params = useParams();

  const [currentStep, setCurrentStep] = useState<Step>({
    order: 0,
    startTime: 0,
  });

  const forwardRef = createRef<any>();
  const playerRef = useRef<any>(null);

  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: {
      id: params.recipeId,
    },
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current) {
        const time = await playerRef?.current.getCurrentTime();
        console.log('step:', getStep(time, data.recipe.steps));
        if (data) {
          setCurrentStep(getStep(time, data.recipe.steps));
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [forwardRef, playerRef, data]);

  const handleTabClick: VerticalTabsOnClick = (step, e) => {
    setCurrentStep({
      order: step.order,
      startTime: step.startTime,
    });
    playerRef.current.seekTo(step.startTime);
  };

  const handleOnReady = async (e: PlayerEvent) => {
    playerRef.current = e.target;
  };

  const handleOnPlay = (e: PlayerEvent) => {
    console.log('play');
  };

  const handleOnPause = (e: PlayerEvent) => {
    console.log('pause');
  };

  const handleOnEnd = (e: PlayerEvent) => {
    console.log('end');
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
              ref={forwardRef}
              videoId={recipe.ytId}
              opts={{ ...ytattrs(currentStep.startTime) }}
              onReady={handleOnReady}
              onPlay={handleOnPlay}
              onPause={handleOnPause}
              onEnd={handleOnEnd}
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
          initValue={currentStep.order}
        />
      </Box>
    </main>
  );
}
