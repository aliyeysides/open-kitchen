import { forwardRef, Ref, ReactElement, ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { formatCurrency } from '../../pages/Recipe';

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
  onCheckout: () => void;
  open: boolean;
  children: ReactNode;
  cost: number;
}

export default function FullScreenDialog({
  onClose,
  onCheckout,
  open,
  children,
  cost,
}: FullScreenDialogProps) {
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
            <Typography sx={{ ml: 2 }} variant="h6" component="div">
              Order Ingredients:
            </Typography>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
              color="primary"
            >
              {formatCurrency(cost)}
            </Typography>
            <Button autoFocus color="primary" onClick={onCheckout}>
              continue to checkout
            </Button>
          </Toolbar>
        </AppBar>
        <List>{children}</List>
      </Dialog>
    </div>
  );
}
