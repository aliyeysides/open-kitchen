import { useEffect, useState } from 'react';
import CheckboxList from '../../../components/display/CheckboxList';
import FullScreenDialog from '../../../components/feedback/FullScreenDialog';
import { OrderItem } from '../../Recipe';
import axios from 'axios';

export interface PreCheckoutFormProps {
  open: boolean;
  onClose: () => void;
  items: {
    name: string;
    quantity: number;
    unit_price: number;
    unit: string;
    image: string;
  }[];
}

export function calculateTotalCost(items: OrderItem[]): number {
  let total = 0;
  items.forEach((item) => (total += item.unit_price * item.quantity));
  return total;
}

export default function PreCheckoutForm({
  items,
  open,
  onClose,
}: PreCheckoutFormProps) {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>(items);
  const [cost, setCost] = useState<number>(0);

  useEffect(() => {
    setCost(calculateTotalCost(selectedItems));
  }, [selectedItems]);

  const handleChange = (value: OrderItem[]): void => {
    setSelectedItems(value);
  };

  const handleCheckout = async () => {
    await axios
      .post('/create-checkout-session', { items: selectedItems })
      .then((url) => (window.location = url.data))
      .catch((e) => console.log('Error creating checkout session:', e));
  };

  return (
    <FullScreenDialog
      open={open}
      onCheckout={handleCheckout}
      cost={cost}
      onClose={onClose}
    >
      <CheckboxList items={selectedItems} onChange={handleChange} />
    </FullScreenDialog>
  );
}
