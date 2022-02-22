import IngredientAutocomplete from '../../components/inputs/IngredientAutocomplete';
import Stack from '@mui/material/Stack';
import { FDCFood } from '../../types';
import NativeSelectDropdown from '../../components/inputs/NativeSelect';
interface IngredientsTableProps {
  ingredients: FDCFood[];
}

function IngredientsTable({ ingredients }: IngredientsTableProps) {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <IngredientTableItem ingredient={ingredient} />
      ))}
    </ul>
  );
}

interface IngredientTableItemProps {
  ingredient: FDCFood;
}

function IngredientTableItem({ ingredient }: IngredientTableItemProps) {
  return <li>{ingredient.description}</li>;
}

function UnitSelectDropdown() {
  const options = [{ value: 'tablespoon', label: 'tablespoon' }];
  return (
    <NativeSelectDropdown label={'unit of measurement'} options={options} />
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
      <UnitSelectDropdown />
      <IngredientsTable ingredients={ingredients} />
      <IngredientAutocomplete onSelect={onSelect} />
    </Stack>
  );
}
