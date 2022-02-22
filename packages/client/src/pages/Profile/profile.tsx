import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_NAME, SET_USER_NAME } from './constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LogoutButton from '../../components/inputs/LogoutButton';

import { useState } from 'react';
export default function ProfilePage() {
  const [setName, { loading, error, data }] = useMutation(SET_USER_NAME);
  const [textValue, setTextValue] = useState<string>('');
  const onTextChange = (e: any) => setTextValue(e.target.value);

  const handleSubmit = () => {
    setName({ variables: { new_name: textValue } });
  };

  // need to find a way to populate the button value after the graphql loaded
  // useEffect(() => {
  //   setTextValue(getNicknameData?.nickname.nickname);
  // });

  const {
    loading: getNameLoading,
    error: getNameError,
    data: getNameData,
  } = useQuery(GET_USER_NAME);
  if (getNameLoading) return <div>"Loading..."</div>;
  if (getNameError) return <div>`Error! ${getNameError.message}`</div>;

  // need to figure out how to call setTextValue when the data is received
  return (
    <>
      <Box>
        <TextField
          id="outlined-basic"
          label="Your name"
          variant="outlined"
          onChange={onTextChange}
          value={textValue}
        />
        <Button onClick={handleSubmit}>Save</Button>
      </Box>
      <Box>
        <LogoutButton />
      </Box>
    </>
  );
}
