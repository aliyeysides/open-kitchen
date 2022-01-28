import { useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoJS from '../../components/VideoJS';
import { Recipe, VideoUpload } from '../../types';
import { GET_RECIPE } from '../Recipes/constants';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import VerticalTabs from '../../components/VerticalTabs';
// import VerticalLinearStepper from "../../components/VerticalLinearStepper";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

interface RecipePageProps {
  previewId?: string;
}

export default function RecipePage({ previewId }: RecipePageProps) {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: {
      id: previewId ? previewId : params.recipeId,
    },
  });

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const recipe: Recipe = data?.recipe;
  const videoUpload: VideoUpload = data?.recipe.video;

  const videoJsOptions: videojs.PlayerOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: false,
    fill: true,
    sources: [
      {
        src: videoUpload.url,
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = () => {
    videojs.log('Your player is ready!');
  };

  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Container disableGutters>
          <Box
            sx={{
              display: 'grid',
              height: 500,
            }}
          >
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </Box>
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
              {/* <AddShoppingCartOutlinedIcon /> */}
              Order Meal Kit
            </Button>
          </Box>
        </Container>
        {/* <Container maxWidth="sm">
          <VerticalLinearStepper />
        </Container> */}
        <VerticalTabs recipe={recipe} />
      </Box>
    </main>
  );
}
