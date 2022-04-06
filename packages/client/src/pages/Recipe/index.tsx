import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
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
import styles from './recipe.module.scss';
import { OrderMap } from '../../components/display/CheckboxList';
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
  const [selectedItems, setSelectedItems] = useState<OrderMap>();
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [allPrices, setAllPrices] = useState<any>();
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
    async function getAllPrices() {
      const {
        data: { prices, total },
      } = await axios.get('/get-prices', {
        params: { recipeId: params.recipeId },
      });
      setTotalCost(total);
      setAllPrices(prices);
    }
    getAllPrices();
  }, [totalCost, params.recipeId]);

  useEffect(() => {
    console.log('allPrices::::', allPrices);
    if (allPrices) {
      let total = 0;
      allPrices.forEach((item: any) => {
        // console.log('SELECTED::::', selectedItems);
        // console.log('ITEM::::', item);
        // let multiple = data.recipe.ingredients.find(
        //   (ing: RecipeIngredient) => ing.price_id === item.id,
        // ).quantity;
        // total += item.unit_amount * multiple;
      });
      // setAdjustedCost(total);
      // console.log('ADJUSTED TOTAL::::::', total);
    }
  }, [selectedItems, allPrices, data]);

  const getPrice = (price_id: string) =>
    allPrices.find((price: any) => price.id === price_id).unit_price;

  const getOrderMap = (data: RecipeIngredient[]): OrderMap => {
    let map: OrderMap = {};
    data.forEach((val) => {
      const unit_price = getPrice(val.price_id);
      map[val.name] = { ...val, checked: true, unit_price };
    });
    return map;
  };

  const handleTabClick: VerticalTabsOnClick = (step, e) => {
    mixpanel.track('Vertical Tab Clicked', { step, ...data });
    playerRef.current.seekTo(step.startTime);
  };

  const handleOnReady = async (e: PlayerEvent) => {
    playerRef.current = e.target;
  };

  const handleCheckout = async () => {
    let items = [];
    for (const item in selectedItems) {
      items.push(selectedItems[item]);
    }
    await axios
      .post('/create-checkout-session', { items })
      .then((url) => (window.location = url.data))
      .catch((e) => console.log('error:::::::', e));
  };

  const handleOrderChange = (value: OrderMap) => {
    setSelectedItems(value);
  };

  const handleOrder = async () => {
    setOrderModal(true);
  };

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const recipe: Recipe = data?.recipe;

  const items = [
    {
      name: 'plum tomato',
      quantity: 2,
      unit_price: 200,
      unit: 'unit',
      image:
        'https://files.stripe.com/links/MDB8YWNjdF8xS1lZb0lCSzdZcFlIcXgzfGZsX3Rlc3RfMEE4b2ZQM05zR0REeTg3RGU2NUpZZHd500Ngjjute8',
    },
    { name: 'sausage', quantity: 2, unit_price: 500, unit: 'unit', image: '' },
    {
      name: 'red onion',
      quantity: 1,
      unit_price: 100,
      unit: 'unit',
      image: '',
    },
  ];

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
            {totalCost && (
              <PreCheckoutForm
                items={items}
                open={orderModal}
                onClose={() => setOrderModal(false)}
                onCheckout={handleCheckout}
                onChange={() => handleOrderChange}
                cost={totalCost}
              />
              // <FullScreenDialog
              //   open={orderModal}
              //   onClose={() => setOrderModal(false)}
              //   onCheckout={handleCheckout}
              //   cost={totalCost}
              // >
              //   <CheckboxList data={orderMap} onChange={handleOrderChange} />
              // </FullScreenDialog>
            )}
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
