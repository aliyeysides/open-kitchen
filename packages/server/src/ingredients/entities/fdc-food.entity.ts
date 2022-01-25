import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FDCFood {
  @Field(() => Int)
  fdcId: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  dataType: FDCDataType;
}

export type FDCDataType = 'Foundation' | 'Branded' | 'SR Legacy';
