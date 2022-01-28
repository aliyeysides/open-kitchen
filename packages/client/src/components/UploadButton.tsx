import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRef } from 'react';

interface UploadButtonProps {
  label: string;
  onChange: ({
    target: {
      validity,
      files: [file],
    },
  }: any) => void;
}

export default function UploadButton({ label, onChange }: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    inputRef.current?.click();
  };

  return (
    <Button variant="outlined" onClick={handleOnClick}>
      <Typography component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'none' }}>
        <input ref={inputRef} type="file" onChange={onChange} required />
      </Box>
    </Button>
  );
}
