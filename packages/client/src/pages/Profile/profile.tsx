import { useMutation, useQuery } from '@apollo/client';
import 'video.js/dist/video-js.css';
import { GET_NICKNAME, SET_NICKNAME } from './constants';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import LogoutButton from '../../components/LogoutButton';

import { useState } from 'react';
export default function ProfilePage() {
  const [setNickname, { loading, error, data }] = useMutation(SET_NICKNAME);
  const [textValue, setTextValue] = useState<string>('');
  const onTextChange = (e: any) => setTextValue(e.target.value);

  const handleSubmit = () => {
    setNickname({ variables: { new_nickname: textValue } });
  };

  // need to find a way to populate the button value after the graphql loaded
  // useEffect(() => {
  //   setTextValue(getNicknameData?.nickname.nickname);
  // });
  const {
    loading: getNameLoading,
    error: getNicknameError,
    data: getNicknameData,
  } = useQuery(GET_NICKNAME);
  if (getNameLoading) return <div>"Loading..."</div>;
  if (getNicknameError) return <div>`Error! ${getNicknameError.message}`</div>;

  // need to figure out how to call setTextValue when the data is received
  return (
    <>
      <Box>
        <TextField
          id="outlined-basic"
          label="Your nickname"
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
