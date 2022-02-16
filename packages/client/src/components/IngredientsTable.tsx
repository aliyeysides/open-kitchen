import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RecipeIngredient } from '../types';

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
            <Box key={ing.name}>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                {ing.quantity} x {ing.unit ? ing.unit + ' of ' : null}
              </Typography>
              <Typography variant="button" color="primary">
                {ing.name}
              </Typography>
            </Box>
          ))}
      </Box>
    </>
  );
}
