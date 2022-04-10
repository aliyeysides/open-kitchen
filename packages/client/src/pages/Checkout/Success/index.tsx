import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SuccessPage() {
  const [search] = useSearchParams();
  const [customer, setCustomer] = useState<any>();

  useEffect(() => {
    function getSessionId(): string {
      return search.get('session_id') as string;
    }
    async function getData() {
      try {
        const {
          data: { customer },
        } = await axios.get('/get-checkout-session', {
          params: { session_id: getSessionId() },
        });
        setCustomer(customer);
      } catch (e) {
        console.error('Error fetching session:', e);
      }
    }
    getData();
  }, [search]);

  return (
    <main>
      {customer ? (
        <section>
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h5"
          >{`Thank you, your order has been placed.`}</Typography>
          <Typography sx={{ my: 2 }}>
            Your items will be delivered to the following address:
          </Typography>
          <Typography sx={{ my: 2 }} color="primary">
            {customer.address.line1} {customer.address.line2},
            {customer.address.city}, {customer.address.state}{' '}
            {customer.address.postal_code}
          </Typography>
          <Typography sx={{ my: 2 }}>Estimated delivery:</Typography>
          <Typography color="primary">1-2 hours</Typography>
          <Typography sx={{ my: 2 }}>
            Please check your email for order confirmation and detailed delivery
            information.
          </Typography>
          <Typography sx={{ my: 2 }}>
            If you have any questions or see a mistake, please call (215)
            920-0814 or email support at support@openkitchenphl.com
          </Typography>
        </section>
      ) : null}
    </main>
  );
}
