import {
  forwardRef,
  useState,
  useEffect,
  Ref,
  ReactElement,
  ChangeEvent,
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { RecipeIngredient } from '../../types';
import { Checkbox, MenuItem } from '@mui/material';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps {
  onClose: () => void;
  onCheckout: (args: any[]) => void;
  open: boolean;
  data: RecipeIngredient[];
}

export default function FullScreenDialog({
  onClose,
  onCheckout,
  open,
  data,
}: FullScreenDialogProps) {
  // const ingredientNames = data.map((ing) => ing.name);
  const [orderIntent, setOrderIntent] = useState<RecipeIngredient[]>(data);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setOrderIntent(
      orderIntent.includes(value)
        ? orderIntent.filter((v) => v !== value)
        : [...orderIntent, value],
    );
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Order Ingredients
            </Typography>
            <Button
              autoFocus
              color="primary"
              onClick={(e) => onCheckout(orderIntent)}
            >
              continue to checkout
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {data.map((ing) => (
            <MenuItem key={ing.name} value={ing.name}>
              <Checkbox
                onChange={handleChange}
                value={ing.name}
                checked={
                  orderIntent.map((ing) => ing.name).indexOf(ing.name) > -1
                }
              />
              <ListItemText primary={ing.name} secondary="$1" inset={true} />
            </MenuItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
