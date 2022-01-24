import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useQuery, gql } from '@apollo/client';
import { Ingredient } from '../types';

const GET_INGREDIENTS = gql`
  query {
    ingredients {
      _id
      name
    }
  }
`;

export default function IngredientAutocomplete() {
  const { loading, error, data } = useQuery(GET_INGREDIENTS);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={data.ingredients}
      getOptionLabel={(option: Ingredient) => option.name}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="select ingredients"
          placeholder="Ingredients"
        />
      )}
    />
  );
}
