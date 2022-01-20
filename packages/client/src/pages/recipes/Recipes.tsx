import { useQuery } from '@apollo/client';
import 'video.js/dist/video-js.css';
import { GET_RECIPES } from './constants';
import { Link } from 'react-router-dom';
import { Recipe } from '../../types';
import Box from '@mui/material/Box';
import { Carousel } from '@trendyol-js/react-carousel';
import styles from './recipes.module.scss';
import SimpleSlider from '../../components/SimpleSlider';
import { Typography } from '@mui/material';
import ActionAreaCard from '../../components/ActionAreaCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

  console.log('recipes:', recipes);

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
      <Box className={styles.section_container}>
        {recipes
          .slice(recipes.length - 4, recipes.length)
          .map((recipe: Recipe) => (
            <Box className={styles.section_item} key={recipe._id}>
              <Link to={`/recipes/${recipe._id}`}>
                <img
                  className={styles.thumbnail}
                  src={recipe.thumbnail.url}
                  alt="test"
                />
              </Link>
            </Box>
          ))}
      </Box>

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
      <Box className={styles.section_container}>
        {recipes
          .slice(recipes.length - 4, recipes.length)
          .map((recipe: Recipe) => (
            <Box className={styles.section_item} key={recipe._id}>
              <Link to={`/recipes/${recipe._id}`}>
                <ActionAreaCard
                  title={recipe.name}
                  thumbnail={recipe.thumbnail.url}
                />
              </Link>
            </Box>
          ))}
      </Box>

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
      <Box className={styles.section_container}>
        {recipes
          .slice(recipes.length - 4, recipes.length)
          .map((recipe: Recipe) => (
            <Box className={styles.section_item} key={recipe._id}>
              <Link to={`/recipes/${recipe._id}`}>
                <ActionAreaCard
                  title={recipe.name}
                  thumbnail={recipe.thumbnail.url}
                />
              </Link>
            </Box>
          ))}
      </Box>
    </>
  );
}

// {
//   /* <Carousel className={styles.carousel} show={3} slide={2} responsive>
//           {recipes.map((recipe: Recipe) => (
//             <Box className={styles.section_item} key={recipe._id}>
//               <Link to={`/recipes/${recipe._id}`}>
//                 <img
//                   className={styles.thumbnail}
//                   src={recipe.thumbnail.url}
//                   alt="test"
//                 />
//               </Link>
//             </Box>
//           ))}
//         </Carousel> */
// }
