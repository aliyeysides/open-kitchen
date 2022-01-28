import IngredientAutocomplete from '../../components/IngredientAutocomplete';
import { FDCFood } from '../../types';

interface AddIngredientsStepProps {
  ingredients: FDCFood[];
  onSelect: (newValue: FDCFood) => void;
}

export default function AddIngredientsStep({
  ingredients,
  onSelect,
}: AddIngredientsStepProps) {
  return (
    <>
      <IngredientAutocomplete onSelect={onSelect} />
      <ul>
        {ingredients.map((d) => {
          return <li>{d.description}</li>;
        })}
      </ul>
    </>
  );
}
