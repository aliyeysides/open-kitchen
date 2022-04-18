import { useQuery } from '@apollo/client';
import { GET_RECIPES } from './constants';
import { Link, useNavigate } from 'react-router-dom';
import { Recipe } from '../../types';
import Box from '@mui/material/Box';
import styles from './recipes.module.scss';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export interface ViewAllLinkProps {
  tag: string;
}

function ViewAllLink({ tag }: ViewAllLinkProps) {
  return (
    <Box className={styles.view_all_link}>
      <Link className={styles.view_all_link_text} to={`/recipes/tags/${tag}`}>
        view all
      </Link>
    </Box>
  );
}

interface RecipesSectionProps {
  recipes: Recipe[];
  tag: string;
}

export function RecipesSection({ recipes, tag }: RecipesSectionProps) {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <Grid container spacing={4}>
      {recipes
        .slice(0, 3)
        .filter((recipe) => recipe.tags.includes(tag))
        .map((recipe: Recipe) => (
          <Grid item key={recipe._id} xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card
              raised
              onClick={(e) => handleClick(recipe._id)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
            >
              <CardMedia
                component="img"
                sx={
                  {
                    // 16:9
                    // pt: '56.25%',
                  }
                }
                src={`//img.youtube.com/vi/${recipe.ytId}/0.jpg`}
                alt={recipe.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography color="primary" variant="h6">
                  {recipe.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

export default function RecipesPage() {
  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const recipes: Recipe[] = data?.recipes;

  return (
    <main data-testid="recipes-page">
      <Box className={styles.section_header}>
        <Typography
          sx={{ color: '#1de9b6', my: 2, cursor: 'pointer' }}
          variant="h4"
        >
          <Link
            className={styles.view_all_link_text}
            to={`/recipes/tags/trending`}
          >
            #trending
          </Link>
        </Typography>
        <ViewAllLink tag="trending" />
      </Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <RecipesSection recipes={recipes} tag="trending" />
      )}

      {/* <Box className={styles.section_header}>
        <Typography
          sx={{ color: '#1de9b6', my: 2, cursor: 'pointer' }}
          variant="h4"
        >
          <Link
            className={styles.view_all_link_text}
            to={`/recipes/tags/vegan`}
          >
            #vegan
          </Link>
        </Typography>
        <ViewAllLink tag="vegan" />
      </Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <RecipesSection recipes={recipes} tag="vegan" />
      )} */}

      {/* <Box className={styles.section_header}>
        <Typography
          sx={{ color: '#1de9b6', my: 2, cursor: 'pointer' }}
          variant="h4"
        >
          <Link
            className={styles.view_all_link_text}
            to={`/recipes/tags/onepot`}
          >
            #onepot
          </Link>
        </Typography>
        <ViewAllLink tag="onepot" />
      </Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <RecipesSection recipes={recipes} tag="onepot" />
      )} */}
    </main>
  );
}
