import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import 'video.js/dist/video-js.css';
import { Recipe, RecipeIngredient, RecipeStep } from '../../types';
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
import axios from 'axios';
import mixpanel from 'mixpanel-browser';
import { loadStripe } from '@stripe/stripe-js';
import FullScreenDialog from '../../components/feedback/FullScreenDialog';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;
const stripePromise = loadStripe(stripePublicKey);

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
  const [orderModal, setOrderModal] = useState<boolean>(false);
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
    mixpanel.track('Vertical Tab Clicked', { step, ...data });
    playerRef.current.seekTo(step.startTime);
  };

  const handleOnReady = async (e: PlayerEvent) => {
    playerRef.current = e.target;
  };

  const handleCheckout = async (items: any[]) => {
    await axios
      .post('/create-checkout-session', { items })
      .then((url) => (window.location = url.data))
      .catch((e) => console.log('error:::::::', e));
  };

  const handleOrder = async () => {
    setOrderModal(true);
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
            <Button
              onClick={handleOrder}
              id="checkout-button"
              type="submit"
              sx={{ ml: 3 }}
              color="primary"
              variant="contained"
            >
              Order Now
            </Button>
            <FullScreenDialog
              data={recipe.ingredients}
              open={orderModal}
              onClose={() => setOrderModal(false)}
              onCheckout={handleCheckout}
            />
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
