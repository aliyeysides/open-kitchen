import IngredientAutocomplete from '../../components/IngredientAutocomplete';
import Stack from '@mui/material/Stack';
import { FDCFood } from '../../types';

interface IngredientsTableProps {
  ingredients: FDCFood[];
}

function IngredientsTable({ ingredients }: IngredientsTableProps) {
  return (
    <ul>
      {ingredients.map((d) => (
        <li>{d.description}</li>
      ))}
    </ul>
  );
}

interface AddRecipeIngredientsFormProps {
  ingredients: FDCFood[];
  onSelect: (newValue: FDCFood) => void;
}

export default function AddRecipeIngredientsForm({
  ingredients,
  onSelect,
}: AddRecipeIngredientsFormProps) {
  return (
    <Stack sx={{ width: '600px' }} spacing={2}>
      <IngredientAutocomplete onSelect={onSelect} />
      <IngredientsTable ingredients={ingredients} />
    </Stack>
  );
}
