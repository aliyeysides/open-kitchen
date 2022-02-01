import IngredientAutocomplete from '../../components/IngredientAutocomplete';
import Stack from '@mui/material/Stack';
import { FDCFood } from '../../types';

interface AddRecipeIngredientsFormProps {
  ingredients: FDCFood[];
  onSelect: (newValue: FDCFood) => void;
}

export default function AddRecipeIngredientsForm({
  ingredients,
  onSelect,
}: AddRecipeIngredientsFormProps) {
  return (
    <Stack spacing={2}>
      <IngredientAutocomplete onSelect={onSelect} />
      <ul>
        {ingredients.map((d) => {
          return <li>{d.description}</li>;
        })}
      </ul>
    </Stack>
  );
}
