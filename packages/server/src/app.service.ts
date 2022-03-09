import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_KEY);
const DOMAIN =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://localhost:8080';

@Injectable()
export class AppService {
  constructor() {}

  getVersion(): string {
    return process.env.npm_package_version;
  }

  async createCheckoutSession(req, res): Promise<void> {
    const session = await stripe.checkout.sessions.create({
      line_items: [], // TODO: get price ids
      mode: 'payment',
      success_url: `${DOMAIN}/checkout/success`,
      cancel_url: `${DOMAIN}/checkout/cancel`,
    });

    res.send(session.url);
  }
}
