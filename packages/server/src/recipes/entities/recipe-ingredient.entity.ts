import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { FDCDataType } from 'src/ingredients/entities/fdc-food.entity';

@ObjectType()
@InputType('RecipeIngredientInput')
export class RecipeIngredient {
  @Field(() => String)
  name: string;
  // @Field(() => Int)
  // fdcId: number;

  // @Field(() => String)
  // description: string;

  @Field(() => String, {
    description: 'unit of measurement (ounces, clove, tablespoon)',
    nullable: true,
  })
  unit?: string;

  @Field(() => Int, {
    description: 'count of units of measurement (quantity x tablespoon)',
  })
  quantity: number;

  // @Field(() => String, {
  //   description: 'data type used to source foods by FDC API',
  // })
  // dataType: FDCDataType;
}
