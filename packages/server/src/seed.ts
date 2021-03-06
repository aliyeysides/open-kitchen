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
        name: 'plum tomato',
        quantity: 2,
        prod_id: 'prod_LHjNIIL7HgISUo',
        price_id: 'price_1Kb9uoBK7YpYHqx36Iyb9Lrm',
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
          'Slice red onion and toss into pan. Cook onions until translucent (5-6 minutes).',
        startTime: 30,
        ingredients: [{ name: 'red onion', quantity: 1 }],
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
        startTime: 75,
        ingredients: [{ name: 'garlic', quantity: 2, unit: 'clove' }],
      },
      {
        order: 5,
        instruction:
          'Turn up the heat on the pan to high and create an empty space in the center by moving contents to the edges of the pan.',
        startTime: 90,
      },
      {
        order: 6,
        instruction:
          'Break the sausage contents into small chunks and toss into the center of the pan. Continuously stir contents and cook the sausage until browned (2-3 minutes). ',
        startTime: 115,
        ingredients: [{ name: 'hot italian sausage', quantity: 2 }],
      },
      {
        order: 7,
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
        order: 8,
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
    tags: ['trending', 'onepot'],
  },
  {
    ingredients: [
      {
        name: 'plum tomato',
        quantity: 2,
        prod_id: 'prod_LHjNIIL7HgISUo',
        price_id: 'price_1Kb9uoBK7YpYHqx36Iyb9Lrm',
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
          'Slice red onion and toss into pan. Cook onions until translucent (5-6 minutes).',
        startTime: 30,
        ingredients: [{ name: 'red onion', quantity: 1 }],
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
        startTime: 75,
        ingredients: [{ name: 'garlic', quantity: 2, unit: 'clove' }],
      },
      {
        order: 5,
        instruction:
          'Turn up the heat on the pan to high and create an empty space in the center by moving contents to the edges of the pan.',
        startTime: 90,
      },
      {
        order: 6,
        instruction:
          'Break the sausage contents into small chunks and toss into the center of the pan. Continuously stir contents and cook the sausage until browned (2-3 minutes). ',
        startTime: 115,
        ingredients: [{ name: 'hot italian sausage', quantity: 2 }],
      },
      {
        order: 7,
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
        order: 8,
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
    name: 'Chicken Piccata Recipe - How to Make Chicken Piccata - Chicken with Lemon Caper Sauce',
    ytId: 'e0CoVPJz2H8',
    tags: ['trending', 'onepot'],
  },
  {
    ingredients: [
      {
        name: 'plum tomato',
        quantity: 2,
        prod_id: 'prod_LHjNIIL7HgISUo',
        price_id: 'price_1Kb9uoBK7YpYHqx36Iyb9Lrm',
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
          'Slice red onion and toss into pan. Cook onions until translucent (5-6 minutes).',
        startTime: 30,
        ingredients: [{ name: 'red onion', quantity: 1 }],
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
        startTime: 75,
        ingredients: [{ name: 'garlic', quantity: 2, unit: 'clove' }],
      },
      {
        order: 5,
        instruction:
          'Turn up the heat on the pan to high and create an empty space in the center by moving contents to the edges of the pan.',
        startTime: 90,
      },
      {
        order: 6,
        instruction:
          'Break the sausage contents into small chunks and toss into the center of the pan. Continuously stir contents and cook the sausage until browned (2-3 minutes). ',
        startTime: 115,
        ingredients: [{ name: 'hot italian sausage', quantity: 2 }],
      },
      {
        order: 7,
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
        order: 8,
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
    name: 'How to Make the Best Cabbage Salad - Red Cabbage Salad with Apple',
    ytId: 'Fnf4TYY6Fd8',
    tags: ['trending', 'onepot', 'vegan'],
  },
  {
    ingredients: [
      {
        name: 'plum tomato',
        quantity: 2,
        prod_id: 'prod_LHjNIIL7HgISUo',
        price_id: 'price_1Kb9uoBK7YpYHqx36Iyb9Lrm',
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
          'Slice red onion and toss into pan. Cook onions until translucent (5-6 minutes).',
        startTime: 30,
        ingredients: [{ name: 'red onion', quantity: 1 }],
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
        startTime: 75,
        ingredients: [{ name: 'garlic', quantity: 2, unit: 'clove' }],
      },
      {
        order: 5,
        instruction:
          'Turn up the heat on the pan to high and create an empty space in the center by moving contents to the edges of the pan.',
        startTime: 90,
      },
      {
        order: 6,
        instruction:
          'Break the sausage contents into small chunks and toss into the center of the pan. Continuously stir contents and cook the sausage until browned (2-3 minutes). ',
        startTime: 115,
        ingredients: [{ name: 'hot italian sausage', quantity: 2 }],
      },
      {
        order: 7,
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
        order: 8,
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
    name: 'Chinese Garlic Green Beans (Chinese Restaurant Style)',
    ytId: '5ObvT0yWtN0',
    tags: ['trending', 'onepot', 'vegan'],
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
