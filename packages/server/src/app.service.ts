import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RecipeIngredient } from './recipes/entities/recipe-ingredient.entity';
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

  async createCheckoutSession(req, res): Promise<void> {
    const { items } = req.body;
    console.log('items:::::', items);

    let item_prices = [];
    for (const { id, quantity } of items) {
      if (quantity > 0) {
        item_prices.push({
          price: id,
          quantity,
        });
      }
    }

    console.log('item_prices:::::', item_prices);

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'ASAP',
            type: 'fixed_amount',
            fixed_amount: {
              amount: 200,
              currency: 'usd',
            },
            delivery_estimate: {
              minimum: {
                unit: 'hour',
                value: 1,
              },
              maximum: {
                unit: 'hour',
                value: 2,
              },
            },
          },
        },
      ],
      line_items: item_prices,
      mode: 'payment',
      success_url: `${DOMAIN}/checkout/success`,
      cancel_url: `${DOMAIN}/checkout/cancel`,
    });

    res.send(session.url);
  }

  // TODO: move this REST endpoint to GRAPHQL resolver
  async getRecipeIngredients(req, res): Promise<void> {
    const { recipeId } = req.query;

    const recipe = await this.recipesService.findOne(recipeId);

    const item_ids = recipe.ingredients.map((item) => item.prod_id);

    const getIngredientByPriceId = (priceId: string): RecipeIngredient =>
      recipe.ingredients.find((item) => item.price_id === priceId);

    const allPrices = await stripe.prices.list({
      limit: 100,
      expand: ['data.product'],
    });

    const prices = allPrices.data.filter((price) =>
      item_ids.includes(price.product.id),
    );

    let total = 0;
    prices.forEach((item) => {
      let multiple = recipe.ingredients.find(
        (ing) => ing.price_id === item.id,
      ).quantity;
      total += item.unit_amount * multiple;
    });

    const items = prices.map((item) => {
      return {
        id: item.id,
        name: item.product.name,
        quantity: getIngredientByPriceId(item.id).quantity,
        unit_price: item.unit_amount,
        unit: getIngredientByPriceId(item.id).unit,
        image: item.product.images[0],
      };
    });

    res.send({ items, total });
  }
}
