import CheckboxList from '../../../components/display/CheckboxList';
import FullScreenDialog from '../../../components/feedback/FullScreenDialog';

export interface PreCheckoutFormProps {
  open: boolean;
  onCheckout: () => void;
  onClose: () => void;
  onChange: () => void;
  cost: number;
  items: {
    name: string;
    quantity: number;
    unit_price: number;
    unit: string;
    image: string;
  }[];
}

export default function PreCheckoutForm({
  items,
  cost,
  open,
  onCheckout,
  onChange,
  onClose,
}: PreCheckoutFormProps) {
  return (
    <FullScreenDialog
      open={open}
      onCheckout={onCheckout}
      cost={cost}
      onClose={onClose}
    >
      <CheckboxList items={items} onChange={onChange} />
    </FullScreenDialog>
  );
}
