import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateIngredientInput {
  @Field({ description: 'Ingredient name' })
  name: string;
}
