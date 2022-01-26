import { useState, useEffect, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useLazyQuery, gql } from '@apollo/client';
import throttle from 'lodash/throttle';
import { FDCFood } from '../types';

const SEARCH_FOOD = gql`
  query Search($query: String!) {
    search(query: $query) {
      description
    }
  }
`;

export default function IngredientAutocomplete() {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<FDCFood | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [searchFood, { loading }] = useLazyQuery(SEARCH_FOOD, {
    onCompleted: (data: any) => {
      console.log('completed:', data);
      if (active) {
        setOptions(data.search);
      }
    },
  });

  const throttledSearchFood = useMemo(() => throttle(searchFood, 200), []);

  useEffect(() => {
    setActive(true);

    if (loading) {
      return undefined;
    }

    if (inputValue === '') {
      console.log("value when input === ''", value);
      setOptions(value ? [value] : []);
      return undefined;
    }

    throttledSearchFood({
      variables: {
        query: inputValue,
      },
    });

    return () => {
      setActive(false);
    };
  }, [inputValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <div>{`value: ${
        value !== null ? `'${value.description}'` : 'null'
      }`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        value={value}
        inputValue={inputValue}
        open={open}
        onChange={(event, newValue: FDCFood | null) => {
          console.log('onChangeValue', newValue);
          setValue(newValue);
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
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
}
