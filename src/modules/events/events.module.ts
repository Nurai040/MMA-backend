import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventMma } from 'src/database/entitites/events.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsResolver } from './events.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([EventMma])],
  providers: [EventsService, EventsResolver],
})
export class EventsModule {}
