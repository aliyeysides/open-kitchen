import { useState, useEffect, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useLazyQuery, gql } from '@apollo/client';
import throttle from 'lodash/throttle';

const SEARCH_FOOD = gql`
  query Search($query: String!) {
    search(query: $query) {
      description
    }
  }
`;

export default function IngredientAutocomplete() {
  const [value, setValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [searchFood, { loading, error, data }] = useLazyQuery(SEARCH_FOOD, {
    onCompleted: () => {},
  });

  const throttledSearchFood = useMemo(() => throttle(searchFood, 500), []);

  useEffect(() => {
    let active = true;

    // if (!loading) {
    //   return undefined;
    // }

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

    if (data) console.log('DATA:::::', data);

    if (!error && data && active) {
      console.log('SETTING OPTIONS...');
      setOptions(data.search);
    }

    return () => {
      active = false;
    };
  }, [inputValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        value={value}
        inputValue={inputValue}
        open={open}
        onChange={(event: any, newValue: string | null) => {
          console.log('NEW VALUE::::', newValue);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          console.log('NEW INPUT VALUE::::', newInputValue);
          setInputValue(newInputValue);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        // isOptionEqualToValue={(option, value) =>
        //   option.description === value.description
        // }
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
