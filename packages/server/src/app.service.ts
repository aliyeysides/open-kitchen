import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RecipesService } from './recipes/recipes.service';

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_KEY);

@Injectable()
export class AppService {
  constructor(private readonly recipesService: RecipesService) {}

  getVersion(): string {
    return process.env.npm_package_version;
  }

  calculateOrderAmount(id: string): number {
    return 100;
  }

  async createPaymentIntent(req, res): Promise<void> {
    const { recipeId } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: this.calculateOrderAmount(recipeId),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }
}
