import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
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
import axios from 'axios';
import mixpanel from 'mixpanel-browser';
import styles from './recipe.module.scss';
import PreCheckoutForm from '../Checkout/PreCheckoutForm';

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

export interface OrderItem {
  name: string;
  quantity: number;
  unit_price: number;
  unit: string;
  image: string;
}

export function getStepTabIndex(currentTime: number, data: Step[]): number {
  return data.reduce((acc, val) => {
    if (currentTime >= val.startTime) {
      return val.order - 1;
    }
    return acc;
  }, 0);
}

export function formatCurrency(num: number): string {
  return `$${num / 100}`;
}

export default function RecipePage() {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const playerRef = useRef<any>({ seekTo: (time: number) => time });
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
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

  useEffect(() => {
    async function getIngredients() {
      try {
        const {
          data: { items, total },
        } = await axios.get('/get-recipe-ingredients', {
          params: { recipeId: params.recipeId },
        });
        setTotalCost(total);
        setItems(items);
      } catch (e) {
        console.error('Error fetching ingredients:', e);
      }
    }
    getIngredients();
    const lastViewedId = params.recipeId as string;
    localStorage.setItem('last-viewed-recipe', lastViewedId);
  }, [params.recipeId]);

  const handleTabClick: VerticalTabsOnClick = (step, e) => {
    mixpanel.track('Vertical Tab Clicked', { step, ...data });
    playerRef.current.seekTo(step.startTime);
  };

  const handleOnReady = async (e: PlayerEvent) => {
    playerRef.current = e.target;
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
              alignItems: 'center',
            }}
          >
            <Box>
              {recipe.tags.length > 0 &&
                recipe.tags.map((tag) => (
                  <Link
                    key={tag}
                    className={styles.tag_link_text}
                    to={`/recipes/tags/${tag}`}
                  >
                    {`#${tag}`}
                  </Link>
                ))}
            </Box>
            {items.length ? (
              <>
                <Button
                  onClick={handleOrder}
                  id="checkout-button"
                  type="submit"
                  sx={{ ml: 'auto' }}
                  color="primary"
                  variant="contained"
                >
                  Order Now: {totalCost ? formatCurrency(totalCost) : null}
                </Button>
                <PreCheckoutForm
                  items={items}
                  open={orderModal}
                  onClose={() => setOrderModal(false)}
                />
              </>
            ) : null}
          </Box>
          <Box sx={{ my: 3, marginBottom: 7 }}>
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
