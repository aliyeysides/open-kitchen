import { CreateRecipeInput } from 'src/recipes/dto/create-recipe.input';

const data: CreateRecipeInput[] = [
  {
    name: 'Spicy Sausage Rice by Gordan Ramsay',
    steps: [
      {
        order: 1,
        instruction:
          'Prepare the sausages by piercing the casing and removing the contents. Begin heating a deep pan on low-medium heat and add a tablespoon of olive oil.',
        startTime: 17,
      },
      {
        order: 2,
        instruction:
          'Slice red onion and toss into pan. Cook onions until translucent (5-6 minutes).',
        startTime: 30,
      },
      {
        order: 3,
        instruction: 'Dice red bell pepper and toss into pan.',
        startTime: 60,
      },
      {
        order: 4,
        instruction:
          'Crush and peel two cloves of garlic. Chop peeled cloves and toss into pan.',
        startTime: 75,
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
      },
      {
        order: 7,
        instruction:
          'Add 1 tablespoon of paprika, 1 cup of white rice, and 1/2 cup of white wine. Stir thoroughly for 30 seconds before adding 2 cups of chicken stock. Reduce heat to low-medium and simmer for 15 minutes. Stir occasionally.',
        startTime: 130,
      },
      {
        order: 8,
        instruction:
          'Slice 3 spring onions, dice 2 tomatoes, and chop 1/2 bunch of fresh Italian parsley. Add all three into pan and turn heat off. Stir thoroughly and enjoy!',
        startTime: 145,
      },
    ],
    ingredients: [{ name: 'tomato' }],
  },
];

export default data;
