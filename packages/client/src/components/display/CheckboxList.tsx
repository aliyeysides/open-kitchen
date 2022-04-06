import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Avatar, Input } from '@mui/material';

export type CheckboxListItem = { name: string; quantity: number };
export type OrderMap = {
  [key: string]: CheckboxListItem & { checked: boolean; unit_price: number };
};

interface CheckboxListProps {
  items: {
    name: string;
    quantity: number;
    unit_price: number;
    unit: string;
    image: string;
  }[];
  onChange: (order: OrderMap) => void;
}

export default function CheckboxList({ items, onChange }: CheckboxListProps) {
  const onQuantityChange = ({ target: { value, name } }: any) => {
    // setOrderMap({
    //   ...orderMap,
    //   [name]: { ...orderMap[name], quantity: +value },
    // });
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
            <ListItemIcon>
              <Input
                sx={{ width: '50px' }}
                name={value.name}
                type="number"
                value={value.quantity}
                onChange={onQuantityChange}
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
