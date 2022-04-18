import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPES_BY_TAG } from './constants';
import NotFound from '../NotFound';
import { RecipesSection } from '../Recipes';
import { Typography } from '@mui/material';

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
      <Typography sx={{ color: '#1de9b6', my: 2 }} variant="h4">
        #{params.tag}
      </Typography>
      {recipes.length && params.tag ? (
        <RecipesSection recipes={recipes} tag={params.tag} />
      ) : (
        <NotFound />
      )}
    </>
  );
}
