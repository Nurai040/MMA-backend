import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fight } from 'src/database/entitites/fights.entity';
import { Repository } from 'typeorm';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Injectable()
export class FightsService {
  constructor(@InjectRepository(Fight) private repo: Repository<Fight>) {}

  async addFight(body: CreateFightInput) {
    const fight = await this.repo.create({
      ...body,
      fighter: { id: body.fighter_id },
      opponent: { id: body.opponent_id },
      event: { id: body.event_id },
    });
    return this.repo.save(fight);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const fight = await this.repo.findOneBy({ id });
    if (!fight) throw new NotFoundException(`Fight #${id} not found`);
    return fight;
  }

  async updateFight(id: number, body: UpdateFightInput) {
    const fight = await this.repo.preload({
      id,
      ...body,
      fighter: body.fighter_id ? { id: body.fighter_id } : undefined,
      opponent: body.opponent_id ? { id: body.fighter_id } : undefined,
      event: body.event_id ? { id: body.fighter_id } : undefined,
    });
    if (!fight) throw new NotFoundException(`Fight #${id} not found`);
    return this.repo.save(fight);
  }

  async delete(id: number) {
    const fight = await this.findOne(id);
    if (!fight) throw new NotFoundException(`Fight #${id} not found`);
    return this.repo.remove(fight);
  }
}
