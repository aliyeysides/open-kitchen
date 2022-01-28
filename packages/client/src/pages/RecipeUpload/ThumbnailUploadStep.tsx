import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRef } from 'react';

interface ThumbnailUploadStepProps {
  onChange: ({
    target: {
      validity,
      files: [file],
    },
  }: any) => void;
}

export default function ThumbnailUploadStep({
  onChange,
}: ThumbnailUploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Box sx={{ height: '500px', width: '500px', border: '1px dashed teal' }}>
        <Button variant="outlined" onClick={handleOnClick}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add Thumbnail
          </Typography>
          <Box sx={{ display: 'none' }}>
            <input ref={inputRef} type="file" onChange={onChange} required />
          </Box>
        </Button>
      </Box>
    </>
  );
}
