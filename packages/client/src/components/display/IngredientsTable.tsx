import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RecipeIngredient } from '../../types';
import IngredientLineItem from './IngredientLineItem';
import { Chip } from '@mui/material';

export interface IngredientsTableProps {
  ingredients?: RecipeIngredient[];
  header?: string;
}

export default function IngredientsTable({
  ingredients,
  header = 'Ingredients',
}: IngredientsTableProps) {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h6">{header}</Typography>
        <Chip
          sx={{ marginLeft: 'auto' }}
          label={`servings: 4`}
          variant="outlined"
        />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          maxHeight: 100,
        }}
      >
        {ingredients &&
          ingredients.map((ing) => (
            <IngredientLineItem key={ing.name} ingredient={ing} />
          ))}
      </Box>
    </>
  );
}
