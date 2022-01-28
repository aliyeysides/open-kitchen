import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRef } from 'react';

interface VideoUploadStepProps {
  onChange: ({
    target: {
      validity,
      files: [file],
    },
  }: any) => void;
}

export default function VideoUploadStep({ onChange }: VideoUploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    inputRef.current?.click();
  };

  return (
    <Button onClick={handleOnClick}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Add Video
      </Typography>
      <Box sx={{ display: 'none' }}>
        <input ref={inputRef} type="file" onChange={onChange} required />
      </Box>
    </Button>
  );
}
