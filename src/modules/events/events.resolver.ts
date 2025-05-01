import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
import { EventMma } from 'src/database/entitites/events.entity';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver()
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  async create(@Args('createEventInput') createEventInput: CreateEventInput) {
    return await this.eventsService.addEvent(createEventInput);
  }

  @Query(() => [EventMma], { name: 'events' })
  async findAll() {
    return await this.eventsService.findAll();
  }

  @Query(() => EventMma, { name: 'event' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.eventsService.findOne(id);
  }

  @Mutation(() => EventMma)
  async updateFight(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return await this.eventsService.updateEvent(
      updateEventInput.id,
      updateEventInput,
    );
  }

  @Mutation(() => EventMma)
  async deleteFight(@Args('id', { type: () => Int }) id: number) {
    return await this.eventsService.delete(id);
  }
}
