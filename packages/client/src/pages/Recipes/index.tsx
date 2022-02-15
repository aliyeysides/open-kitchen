import { useQuery } from '@apollo/client';
import { GET_RECIPES } from './constants';
import { Link } from 'react-router-dom';
import { Recipe } from '../../types';
import Box from '@mui/material/Box';
import styles from './recipes.module.scss';
import { Typography } from '@mui/material';

function ViewAllLink() {
  return (
    <Box className={styles.view_all_link}>
      <Link className={styles.view_all_link_text} to={`/recipes/upload`}>
        view all
      </Link>
    </Box>
  );
}

export default function RecipesPage() {
  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const recipes: Recipe[] = data?.recipes;

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
              <Box
                className={styles.section_item}
                key={recipe._id}
                sx={{ cursor: 'pointer' }}
              >
                <Link to={`/recipes/${recipe._id}`}>
                  <img src={`//img.youtube.com/vi/${recipe.ytId}/0.jpg`} />
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
              <Box
                className={styles.section_item}
                key={recipe._id}
                sx={{ cursor: 'pointer' }}
              >
                <Link to={`/recipes/${recipe._id}`}>
                  <img src={`//img.youtube.com/vi/${recipe.ytId}/0.jpg`} />
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
              <Box
                className={styles.section_item}
                key={recipe._id}
                sx={{ cursor: 'pointer' }}
              >
                <Link to={`/recipes/${recipe._id}`}>
                  <img src={`//img.youtube.com/vi/${recipe.ytId}/0.jpg`} />
                </Link>
              </Box>
            ))}
        </Box>
      )}
    </>
  );
}
