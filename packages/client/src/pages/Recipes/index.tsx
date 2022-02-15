import { useQuery } from '@apollo/client';
import 'video.js/dist/video-js.css';
import { GET_RECIPES } from './constants';
import { Link } from 'react-router-dom';
import { Recipe, RecipeStep } from '../../types';
import Box from '@mui/material/Box';
import styles from './recipes.module.scss';
import { Typography } from '@mui/material';
import ActionAreaCard from '../../components/ActionAreaCard';
import YouTubePlayer from '../../components/YouTubePlayer';

function ViewAllLink() {
  return (
    <Box className={styles.view_all_link}>
      <Link className={styles.view_all_link_text} to={`/recipes/upload`}>
        view all
      </Link>
    </Box>
  );
}

function getOptions() {
  return {
    width: '1024',
    height: '576',
    playerVars: {
      autoplay: 1,
      origin: 'http://localhost:3000',
    },
  };
}

export default function RecipesPage() {
  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const recipes: Recipe[] = data?.recipes;

  const handleYTReady = (event: any) => {
    console.log('event.target user::', event.target);
    // event.target.pauseVideo();
  };

  return (
    <>
      <Box className={styles.section_header}>
        <Typography
          sx={{ color: '#1de9b6', my: 2, cursor: 'pointer' }}
          variant="h4"
        >
          <Link className={styles.view_all_link_text} to={`/recipes/upload`}>
            #trending
          </Link>
        </Typography>
        <ViewAllLink />
      </Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box className={styles.section_container}>
          {recipes
            .slice(recipes.length - 4, recipes.length)
            .map((recipe: Recipe) => (
              <Box className={styles.section_item} key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  <YouTubePlayer
                    {...getOptions()}
                    videoId={recipe.ytId}
                    onReady={handleYTReady}
                  />
                  {/* <img
                  className={styles.thumbnail}
                  src={recipe.thumbnail.url}
                  alt="test"
                /> */}
                </Link>
              </Box>
            ))}
        </Box>
      )}

      <Box className={styles.section_header}>
        <Typography
          sx={{ color: '#1de9b6', my: 2, cursor: 'pointer' }}
          variant="h4"
        >
          <Link className={styles.view_all_link_text} to={`/recipes/upload`}>
            #vegan
          </Link>
        </Typography>
        <ViewAllLink />
      </Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box className={styles.section_container}>
          {recipes
            .slice(recipes.length - 4, recipes.length)
            .map((recipe: Recipe) => (
              <Box className={styles.section_item} key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  {recipe.ytId ? (
                    <YouTubePlayer
                      {...getOptions()}
                      videoId={recipe.ytId}
                      onReady={handleYTReady}
                    />
                  ) : null}
                  {/* <ActionAreaCard
                  title={recipe.name}
                  thumbnail={recipe.thumbnail.url}
                /> */}
                </Link>
              </Box>
            ))}
        </Box>
      )}

      <Box className={styles.section_header}>
        <Typography
          sx={{ color: '#1de9b6', my: 2, cursor: 'pointer' }}
          variant="h4"
        >
          <Link className={styles.view_all_link_text} to={`/recipes/upload`}>
            #onepot
          </Link>
        </Typography>
        <ViewAllLink />
      </Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box className={styles.section_container}>
          {recipes
            .slice(recipes.length - 4, recipes.length)
            .map((recipe: Recipe) => (
              <Box className={styles.section_item} key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  {recipe.ytId ? (
                    <YouTubePlayer
                      {...getOptions()}
                      videoId={recipe.ytId}
                      onReady={handleYTReady}
                    />
                  ) : null}
                  {/* <ActionAreaCard
                  title={recipe.name}
                  thumbnail={recipe.thumbnail.url}
                /> */}
                </Link>
              </Box>
            ))}
        </Box>
      )}
    </>
  );
}
