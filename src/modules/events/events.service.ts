import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventMma } from 'src/database/entitites/events.entity';
import { Repository, UpdateEvent } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(EventMma) private repo: Repository<EventMma>) {}

  async addEvent(body: CreateEventInput) {
    const event = this.repo.create({
      ...body,
    });
    return await this.repo.save(event);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const event = await this.repo.findBy({ id });
    if (!event) throw new NotFoundException(`Event #${id} not found`);
    return event;
  }

  async updateEvent(id: number, body: UpdateEventInput) {
    const event = await this.repo.preload({
      id,
      ...body,
    });
    if (!event) throw new NotFoundException(`Event #${id} not found`);
    return await this.repo.save(event);
  }

  async delete(id: number) {
    const event = await this.repo.findBy({ id });
    if (!event) throw new NotFoundException(`Event #${id} not found`);
    return await this.repo.remove(event);
  }
}
