import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect, { NativeSelectProps } from '@mui/material/NativeSelect';

interface NativeSelectDropdownProps extends NativeSelectProps {
  label?: string;
  options: { value: any; label: string }[];
}

export default function NativeSelectDropdown({
  label,
  options,
  ...props
}: NativeSelectDropdownProps) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {label}
        </InputLabel>
        <NativeSelect {...props}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
