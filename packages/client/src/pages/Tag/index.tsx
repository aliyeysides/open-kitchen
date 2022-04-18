import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPES_BY_TAG } from './constants';
import { Recipe } from '../../types';
import { Box, Typography } from '@mui/material';
import NotFound from '../NotFound';

interface RecipesSectionProps {
  recipes: Recipe[];
  tag: string;
}

const $bright_teal = '#1de9b6';

const styles = {
  section_header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  section_container: {
    maxHeight: '300px',
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '50px',
  },
  section_item: {
    height: 'auto',
    width: '100%',
    maxHeight: '100%',
    cursor: 'pointer',
  },
  tag_header: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    color: $bright_teal,
  },
};

function RecipesSection({ recipes, tag }: RecipesSectionProps) {
  return (
    <>
      <Box sx={styles.section_header}>
        <Typography
          sx={{ color: '#1de9b6', my: 2, cursor: 'pointer' }}
          variant="h4"
        >
          <Box sx={styles.tag_header}>{`#${tag}`}</Box>
        </Typography>
      </Box>
      <Box sx={styles.section_container}>
        {recipes.map((recipe: Recipe) => (
          <Box sx={styles.section_item} key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>
              <img alt="" src={`//img.youtube.com/vi/${recipe.ytId}/0.jpg`} />
            </Link>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default function TagPage() {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_RECIPES_BY_TAG, {
    variables: {
      tag: params.tag,
    },
  });

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const recipes = data?.recipesByTag;

  return (
    <>
      {recipes.length && params.tag ? (
        <RecipesSection recipes={recipes} tag={params.tag} />
      ) : (
        <NotFound />
      )}
    </>
  );
}
