import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Avatar, Input } from '@mui/material';
import { OrderItem } from '../../pages/Recipe';

interface CheckboxListProps {
  items: {
    name: string;
    quantity: number;
    unit_price: number;
    unit: string;
    image: string;
  }[];
  onChange: (newItems: OrderItem[]) => void;
}

export default function CheckboxList({ items, onChange }: CheckboxListProps) {
  const handleChange = ({ target: { value, name } }: any): void => {
    const adjustedItems = items.map((item) => {
      if (item.name === name) {
        return { ...item, quantity: value };
      }
      return item;
    });
    onChange(adjustedItems);
  };

  return (
    <List>
      {items.map((value) => {
        const labelId = `checkbox-list-label-${value.name}`;

        return (
          <ListItem
            button
            disableRipple
            key={value.name}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <Avatar alt="" src={value.image} variant="square" />
              </IconButton>
            }
          >
            <ListItemIcon sx={{ textAlign: 'center' }}>
              <Input
                sx={{ width: '40px' }}
                name={value.name}
                type="number"
                value={value.quantity}
                onChange={handleChange}
                margin="dense"
              />
            </ListItemIcon>
            <ListItemText
              id={labelId}
              primary={`${value.name}`}
              secondary={`$${(value.unit_price / 100).toFixed(2)}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
