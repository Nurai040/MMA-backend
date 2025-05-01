import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fighter } from 'src/database/entitites/fighters.entity';
import { Repository } from 'typeorm';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';

@Injectable()
export class FighterService {
  constructor(@InjectRepository(Fighter) private repo: Repository<Fighter>) {}

  async addFighter(body: CreateFighterInput) {
    const fighter = await this.repo.create({
      ...body,
    });
    return await this.repo.save(fighter);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findBy({ id });
  }

  async updateFighter(id: number, body: UpdateFighterInput) {
    const fighter = await this.repo.preload({
      id,
      ...body,
    });
    if (!fighter) throw new NotFoundException(`Fighter #${id} not found`);
    return await this.repo.save(fighter);
  }

  async delete(id: number) {
    const fighter = await this.repo.findBy({ id });
    if (!fighter) throw new NotFoundException(`Fighter #${id} not found`);
    return await this.repo.remove(fighter);
  }
}
