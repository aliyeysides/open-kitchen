import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RecipesService } from './recipes/recipes.service';

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_KEY);
const DOMAIN =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://localhost:8080';

@Injectable()
export class AppService {
  constructor(private readonly recipesService: RecipesService) {}

  getVersion(): string {
    return process.env.npm_package_version;
  }

  async createCheckoutSession(req, res): Promise<void> {
    const recipeId = req.body.recipeId;
    const recipe = await this.recipesService.findOne(recipeId);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        ...recipe.ingredients.map(({ quantity, price_id }) => ({
          quantity,
          price: price_id,
        })),
      ],
      mode: 'payment',
      success_url: `${DOMAIN}/checkout/success`,
      cancel_url: `${DOMAIN}/checkout/cancel`,
      shipping_address_collection: { allowed_countries: ['US'] },
    });

    res.send(session.url);
  }
}
