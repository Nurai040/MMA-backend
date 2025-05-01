import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFightInput {
  @Field(() => Int)
  fighter_id: number;

  @Field(() => Int)
  opponent_id: number;

  @Field(() => Int)
  event_id: number;

  @Field()
  result: 'win' | 'loss' | 'draw';

  @Field()
  fight_date: Date;

  @Field({ nullable: true })
  method?: string;
}
