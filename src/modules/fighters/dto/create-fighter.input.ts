import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFighterInput {
  @Field()
  name: string;

  @Field({ defaultValue: 0 })
  wins: number;

  @Field({ defaultValue: 0 })
  losses: number;

  @Field({ defaultValue: 0 })
  knockouts: number;

  @Field({ defaultValue: 0 })
  submissions: number;

  @Field()
  weight_class: string;

  @Field()
  nationality: string;

  @Field({ nullable: true })
  team?: string;
}
