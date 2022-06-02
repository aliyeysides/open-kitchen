import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import SeederService from './seeder/seeder.service';
import { Recipe } from './recipes/entities/recipe.entity';

const data = [
  {
    ingredients: [
      {
        name: 'olive oil',
        quantity: 1,
        prod_id: 'prod_LWzc1aRwhyrvgT',
        price_id: 'price_1KpvdSBK7YpYHqx3sHF6DSmw',
      },
      {
        name: 'plum tomato',
        quantity: 2,
        prod_id: 'prod_LU60N5WXYSOz6S',
        price_id: 'price_1Kn7oxBK7YpYHqx3q5Nc0Iwa',
      },
      {
        name: 'garlic',
        quantity: 2,
        unit: 'clove',
        prod_id: 'prod_LU62ZKzGFdnVry',
        price_id: 'price_1Kn7qqBK7YpYHqx3zBI3Gnva',
      },
      {
        name: 'hot italian sausage',
        quantity: 2,
        prod_id: 'prod_LU64ien3MhWkBj',
        price_id: 'price_1Kn7skBK7YpYHqx3v8JN5WrC',
      },
      {
        name: 'red bell pepper',
        quantity: 1,
        prod_id: 'prod_LU66NemzI0Eyxa',
        price_id: 'price_1Kn7uJBK7YpYHqx3lQlfDRSU',
      },
      {
        name: 'white rice',
        quantity: 1,
        unit: 'cup',
        prod_id: 'prod_LU68bDaB4y340B',
        price_id: 'price_1Kn7vwBK7YpYHqx3DF8IZnTp',
      },
      {
        name: 'red onion',
        quantity: 1,
        prod_id: 'prod_LU69NStMdG1SAO',
        price_id: 'price_1Kn7xKBK7YpYHqx3aervWSzo',
      },
      {
        name: 'spring onion',
        quantity: 1,
        unit: 'bunch',
        prod_id: 'prod_LU6AeEIkDXTWe0',
        price_id: 'price_1Kn7yCBK7YpYHqx3kR5Brheg',
      },
      {
        name: 'italian parsley',
        quantity: 1,
        unit: 'bunch',
        prod_id: 'prod_LU6CNRvnqlftVu',
        price_id: 'price_1Kn80JBK7YpYHqx3jWi62Uvt',
      },
      {
        name: 'smoked paprika',
        quantity: 1,
        unit: 'tablespoon',
        prod_id: 'prod_LU6EJBn3SS7jUz',
        price_id: 'price_1Kn81ZBK7YpYHqx3KWBWAfMj',
      },
      {
        name: 'white cooking wine',
        quantity: 1,
        unit: 'cup',
        prod_id: 'prod_LU6FpS8Drty2Fz',
        price_id: 'price_1Kn82kBK7YpYHqx3oUTS77Zw',
      },
      {
        name: 'chicken stock',
        quantity: 2,
        unit: 'cup',
        prod_id: 'prod_LU6H7QhbQFJ1ZL',
        price_id: 'price_1Kn84mBK7YpYHqx3ByHypTm3',
      },
    ],
    steps: [
      {
        order: 1,
        instruction:
          'Prepare the sausages by piercing the casing and removing the contents. Begin heating a deep pan on low-medium heat and add a tablespoon of olive oil.',
        startTime: 17,
        ingredients: [{ name: 'hot italian sausage', quantity: 2 }],
      },
      {
        order: 2,
        instruction:
          'Slice red onion and toss into pan with olive oil on medium-low heat. Cook onions until translucent (5-6 minutes).',
        startTime: 30,
        ingredients: [
          { name: 'red onion', quantity: 1 },
          { name: 'olive oil', quantity: 2, unit: 'tablespoon' },
        ],
      },
      {
        order: 3,
        instruction: 'Dice red bell pepper and toss into pan.',
        startTime: 60,
        ingredients: [{ name: 'red bell pepper', quantity: 1 }],
      },
      {
        order: 4,
        instruction:
          'Crush and peel two cloves of garlic. Chop peeled cloves and toss into pan.',
        startTime: 78,
        ingredients: [{ name: 'garlic', quantity: 2, unit: 'clove' }],
      },
      {
        order: 5,
        instruction:
          'Turn up the heat on the pan to high and create an empty space in the center by moving contents to the edges of the pan. Break the sausage contents into small chunks and toss into the center of the pan. Continuously stir contents and cook the sausage until browned (2-3 minutes). ',
        startTime: 92,
        ingredients: [{ name: 'hot italian sausage', quantity: 2 }],
      },
      {
        order: 6,
        instruction:
          'Add 1 tablespoon of paprika, 1 cup of white rice, and 1 cup of white wine. Stir thoroughly for 30 seconds before adding 2 cups of chicken stock. Reduce heat to low-medium and simmer for 15 minutes. Stir occasionally.',
        startTime: 130,
        ingredients: [
          { name: 'paprika', quantity: 1, unit: 'tablespoon' },
          { name: 'white rice', quantity: 1, unit: 'cup' },
          { name: 'white wine', quantity: 1, unit: 'cup' },
          { name: 'chicken stock', quantity: 2, unit: 'cup' },
        ],
      },
      {
        order: 7,
        instruction:
          'Slice 3 spring onions, dice 2 tomatoes, and chop 1 bunch of fresh Italian parsley. Add all three into pan and turn heat off. Stir thoroughly and enjoy!',
        startTime: 180,
        ingredients: [
          { name: 'spring onions', quantity: 1, unit: 'bunch' },
          { name: 'italian parsley', quantity: 1, unit: 'bunch' },
          { name: 'plum tomato', quantity: 2 },
        ],
      },
    ],
    name: 'Spicy Sausage Rice by Gordan Ramsay',
    ytId: 'FP6E3JtmsCE',
    tags: ['trending'],
  },
  {
    ingredients: [
      {
        name: 'Chicken Breast - Boneless & Skinless (pack of 3)',
        quantity: 1,
        prod_id: 'prod_LWzPSMQjFSmGCY',
        price_id: 'price_1KpvR6BK7YpYHqx30R3Q47p2',
      },
      {
        name: 'Cayenne Pepper',
        quantity: 1,
        prod_id: 'prod_LWzWntk9QlE63L',
        price_id: 'price_1KpvXCBK7YpYHqx3hegZz6CK',
      },
      {
        name: 'Flour',
        quantity: 1,
        prod_id: 'prod_LWzZiAbBaehBXu',
        price_id: 'price_1KpvaNBK7YpYHqx3omQ3xJ2T',
      },
      {
        name: 'Olive Oil',
        quantity: 1,
        prod_id: 'prod_LWzc1aRwhyrvgT',
        price_id: 'price_1KpvdSBK7YpYHqx3sHF6DSmw',
      },
      {
        name: 'Non-Pareil Capers',
        quantity: 1,
        prod_id: 'prod_LWzisFpZSGEQEL',
        price_id: 'price_1Kpvj5BK7YpYHqx3r6XcfKBH',
      },
      {
        name: 'White Cooking Wine',
        quantity: 1,
        prod_id: 'prod_LU6FpS8Drty2Fz',
        price_id: 'price_1Kn82kBK7YpYHqx3oUTS77Zw',
      },
      {
        name: 'Lemon',
        quantity: 1,
        prod_id: 'prod_LWzsbMwO1HB0Pj',
        price_id: 'price_1KpvsIBK7YpYHqx3qvGhgkdR',
      },
      {
        name: 'Butter',
        quantity: 1,
        prod_id: 'prod_LWzu2gUScluGbd',
        price_id: 'price_1KpvuiBK7YpYHqx3XgHocVx4',
      },
      {
        name: 'Italian Parsley',
        quantity: 1,
        unit: 'bunch',
        prod_id: 'prod_LU6CNRvnqlftVu',
        price_id: 'price_1Kn80JBK7YpYHqx3jWi62Uvt',
      },
    ],
    steps: [
      {
        order: 1,
        instruction:
          'Prepare the chicken breasts by tenderizing (pounding) them.',
        startTime: 30,
        ingredients: [{ name: 'chicken breast', quantity: 2 }],
      },
      {
        order: 2,
        instruction:
          'Season the chicken with cayenne pepper, salt, and black pepper.',
        startTime: 38,
        ingredients: [{ name: 'cayenne pepper', quantity: 1, unit: 'pinch' }],
      },
      {
        order: 3,
        instruction: 'Lightly dredge (coat) the chicken in flour',
        startTime: 50,
        ingredients: [{ name: 'flour', quantity: 1, unit: 'cup' }],
      },
      {
        order: 4,
        instruction:
          'Heat skillet to high. Add olive oil to heated skillet. Add chicken breasts and turn heat down to medium. Cook until both sides of chicken are browned, and then remove chicken from skillet on to a separate plate.',
        startTime: 75,
        ingredients: [
          { name: 'olive oil', quantity: 2, unit: 'tablespoon' },
          { name: 'chicken breast', quantity: 2 },
        ],
      },
      {
        order: 5,
        instruction:
          "Add 1 tablespoon of the capers onto the same skillet on medium heat. Crush half of the capers with a fork to release it's liquids. Cook for about 30 seconds.",
        startTime: 120,
        ingredients: [
          { name: 'non-pereil capers', quantity: 1, unit: 'tablespoon' },
        ],
      },
      {
        order: 6,
        instruction:
          'Add 1/2 cup of the white cooking wine and deglaze the skillet and boil until wine is reduced by half (2 minutes).',
        startTime: 135,
        ingredients: [
          { name: 'white cooking wine', quantity: 1, unit: 'half cup' },
        ],
      },
      {
        order: 7,
        instruction:
          'Slice lemon in half and squeeze both halves into skillet along with a tablespoon of water. Add 3 tablespoons of butter and turn heat to low. Continously stir and allow butter to melt.',
        startTime: 149,
        ingredients: [
          { name: 'lemon', quantity: 1 },
          { name: 'butter', quantity: 3, unit: 'tablespoon' },
        ],
      },
      {
        order: 8,
        instruction:
          'Add diced italian parsely to the skillet. Add cooked chicken breast back into skillet. Cook for 1 minute.',
        startTime: 170,
        ingredients: [
          { name: 'italian parsley', quantity: 1, unit: 'pinch' },
          { name: 'chicken breast', quantity: 2 },
        ],
      },
    ],
    name: 'Chicken Piccata Recipe - How to Make Chicken Piccata - Chicken with Lemon Caper Sauce',
    ytId: 'e0CoVPJz2H8',
    tags: ['trending'],
  },
  {
    ingredients: [
      {
        name: 'Green Cabbage',
        quantity: 1,
        unit: 'head',
        prod_id: 'prod_LXm1b7DIxYQSEp',
        price_id: 'price_1KqgTgBK7YpYHqx3NPdSTo0C',
      },
      {
        name: 'Red Cabbage',
        quantity: 1,
        unit: 'head',
        prod_id: 'prod_LXm3Ub9WA6scyO',
        price_id: 'price_1KqgVfBK7YpYHqx3UABfHVeP',
      },
      {
        name: 'Carrot',
        quantity: 2,
        prod_id: 'prod_LXm6pxzbtTkkUc',
        price_id: 'price_1KqgXwBK7YpYHqx3f8luMzqU',
      },
      {
        name: 'Olive Oil',
        quantity: 1,
        prod_id: 'prod_LWzc1aRwhyrvgT',
        price_id: 'price_1KpvdSBK7YpYHqx3sHF6DSmw',
      },
      {
        name: 'Italian Parsley',
        quantity: 1,
        unit: 'bunch',
        prod_id: 'prod_LU6CNRvnqlftVu',
        price_id: 'price_1Kn80JBK7YpYHqx3jWi62Uvt',
      },
      {
        name: 'Raisins',
        quantity: 1,
        prod_id: 'prod_LXmDHrTvBHRIrH',
        price_id: 'price_1KqgepBK7YpYHqx3TB4w7TCd',
      },
      {
        name: 'Sliced Almonds',
        quantity: 1,
        prod_id: 'prod_LXmFvBScNkWgVs',
        price_id: 'price_1Kqgh4BK7YpYHqx34LKnW6GD',
      },
      {
        name: 'Honey',
        quantity: 1,
        prod_id: 'prod_LXmI131oqPSgZe',
        price_id: 'price_1KqgjRBK7YpYHqx38YTEvl3c',
      },
      {
        name: 'Sugar',
        quantity: 1,
        prod_id: 'prod_LXmJSCvX18w8hE',
        price_id: 'price_1KqglLBK7YpYHqx355p34Bvv',
      },
      {
        name: 'Red Wine Vinegar',
        quantity: 1,
        unit: 'tablespoon',
        prod_id: 'prod_LXmMlKM4vzkPVr',
        price_id: 'price_1KqgnxBK7YpYHqx3c4zFIpPc',
      },
      {
        name: 'Rice Vinegar',
        quantity: 1,
        unit: 'tablespoon',
        prod_id: 'prod_LXmOllhxAsN2nr',
        price_id: 'price_1KqgpeBK7YpYHqx3ccPJ0rCb',
      },
    ],
    steps: [
      {
        order: 1,
        instruction:
          'Start by slicing the red cabbage and add to a large bowl.',
        startTime: 58,
        ingredients: [{ name: 'Red Cabbage', quantity: 1 }],
      },
      {
        order: 2,
        instruction:
          'Place 1 tablespoon of red wine vinegar and 1 tablespoon of rice vinegar into a sauce pan and bring to a boil. Once it starts to boil, take off the heat and pour the vinegar into the bowl while hot. Mix the contents of the bowl.',
        startTime: 129,
        ingredients: [
          { name: 'Red Wine Vinegar', quantity: 1 },
          { name: 'Rice Vinegar', quantity: 1 },
        ],
      },
      {
        order: 3,
        instruction: 'Peel and coarsly grate both carrots and add to the bowl.',
        startTime: 167,
        ingredients: [{ name: 'Carrot', quantity: 2 }],
      },
      {
        order: 4,
        instruction:
          'Slice the green cabbage similiar to the first step and then add the cabbage to the bowl.',
        startTime: 189,
        ingredients: [{ name: 'Green Cabbage', quantity: 1 }],
      },
      {
        order: 5,
        instruction:
          'Add 1/4 cup sliced almonds, 1/4 cup raisins, 1 tablespoon chopped parsley, and 4 tablespoons of olive oil. Season with a pinch of sugar, salt and pepper to the bowl.',
        startTime: 230,
        ingredients: [
          { name: 'Sliced Almonds', quantity: 1 },
          { name: 'Raisins', quantity: 1 },
          { name: 'Italian Parsley', quantity: 1 },
          { name: 'Olive Oil', quantity: 1 },
          { name: 'Sugar', quantity: 1 },
          { name: 'Salt', quantity: 1 },
          { name: 'Pepper', quantity: 1 },
        ],
      },
      {
        order: 6,
        instruction:
          'Add 1 teaspoon of honey and mix well. Make sure to taste and adjust seasoning accordingly. Serve cold and bon appetit!',
        startTime: 266,
        ingredients: [{ name: 'Honey', quantity: 1 }],
      },
    ],
    name: 'How to Make the Best Cabbage Salad - Red Cabbage Salad with Apple',
    ytId: 'Fnf4TYY6Fd8',
    tags: ['trending'],
  },
];

// Uncomment and run `npm run seed` to DROP and SEED the 'development' database
seed('development', Recipe.name, data);

async function seed(dbName: string, modelName: string, seedData: any[]) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const seeder = app.get(SeederService);

  await seeder.seed(dbName, modelName, seedData);
  const PORT = config.get('port');

  await app.listen(PORT);
}
