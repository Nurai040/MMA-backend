import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field()
  event_date: Date;
}
