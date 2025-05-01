import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from 'src/database/entitites/rankings.entity';
import { Repository } from 'typeorm';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';

@Injectable()
export class RankingsService {
  constructor(@InjectRepository(Ranking) private repo: Repository<Ranking>) {}

  async addRanking(body: CreateRankingInput) {
    const ranking = this.repo.create({
      ...body,
      fighter: { id: body.fighter_id },
    });
    return await this.repo.save(ranking);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const ranking = await this.repo.findBy({
      id,
    });
    if (!ranking) throw new NotFoundException(`Ranking #${id} not found`);
    return ranking;
  }

  async updateRanking(id: number, body: UpdateRankingInput) {
    const ranking = await this.repo.preload({
      id,
      ...body,
      fighter: { id: body.fighter_id },
    });
    if (!ranking) throw new NotFoundException(`Ranking #${id} not found`);
    return await this.repo.save(ranking);
  }

  async delete(id: number) {
    const ranking = await this.repo.findBy({ id });
    if (!ranking) throw new NotFoundException(`Ranking #${id} not found`);
    return await this.repo.remove(ranking);
  }
}
