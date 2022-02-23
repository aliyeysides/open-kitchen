import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RecipeIngredient } from '../../types';

export interface IngredientLintItemProps extends JSX.IntrinsicAttributes {
  ingredient: RecipeIngredient;
}

export default function IngredientLineItem({
  ingredient,
  ...attrs
}: IngredientLintItemProps) {
  const ing = ingredient;
  return (
    <Box {...attrs}>
      <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
        {ing.quantity} x {ing.unit ? ing.unit + ' of ' : ' unit of '}
      </Typography>
      <Typography variant="button" color="primary">
        {ing.name}
      </Typography>
    </Box>
  );
}
