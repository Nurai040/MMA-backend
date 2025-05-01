import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateFighterInput } from './create-fighter.input';

@InputType()
export class UpdateFighterInput extends PartialType(CreateFighterInput) {
  @Field(() => Int)
  id: number;
}
