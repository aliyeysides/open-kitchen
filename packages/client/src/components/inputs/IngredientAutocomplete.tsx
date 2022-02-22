import { useState, useEffect, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useLazyQuery, gql } from '@apollo/client';
import debounce from 'lodash/debounce';
import uniqBy from 'lodash/unionBy';
import { FDCFood } from '../../types';

const SEARCH_FOOD = gql`
  query Search($query: String!) {
    search(query: $query) {
      fdcId
      description
      dataType
    }
  }
`;

interface IngredientAutocompleteProps {
  onSelect: (newValue: FDCFood) => void;
}

export default function IngredientAutocomplete({
  onSelect,
}: IngredientAutocompleteProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState<FDCFood | null>(null); // TODO: Determine if we even need this and remove eslint disable
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [searchFood, { loading, error, data }] = useLazyQuery(SEARCH_FOOD);

  const throttledSearchFood = useMemo(
    () => debounce(searchFood, 200),
    [searchFood],
  );

  useEffect(() => {
    let active = true;

    if (loading) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    if (active) {
      throttledSearchFood({
        variables: {
          query: inputValue,
        },
      });
    }

    if (data && !error) {
      const search = uniqBy(data.search, 'description');
      setOptions(search);
    }

    return () => {
      active = false;
    };
  }, [loading, data, error, inputValue, value, throttledSearchFood]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      value={value}
      inputValue={inputValue}
      open={open}
      onChange={(event, newValue: FDCFood | null) => {
        if (newValue !== null) onSelect(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option.description === value.description
      }
      filterOptions={(x) => x}
      getOptionLabel={(option: string | { description: string }) =>
        typeof option === 'string' ? option : option.description
      }
      options={options}
      loading={loading}
      blurOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          label="search ingredient..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {/* {params.InputProps.endAdornment} */}
              </>
            ),
          }}
        />
      )}
    />
  );
}
