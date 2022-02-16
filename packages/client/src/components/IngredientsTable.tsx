import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RecipeIngredient } from '../types';
import IngredientLineItem from './IngredientLineItem';

export interface IngredientsTableProps {
  ingredients?: RecipeIngredient[];
  header?: string;
}

export default function IngredientsTable({
  ingredients,
  header,
}: IngredientsTableProps) {
  return (
    <>
      {header ? <Typography variant="h6">{header}</Typography> : null}
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
