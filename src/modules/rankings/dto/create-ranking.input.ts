import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRankingInput {
  @Field(() => Int)
  fighter_id: number;

  @Field()
  weight_class: string;

  @Field(() => Int)
  rank: number;
}
