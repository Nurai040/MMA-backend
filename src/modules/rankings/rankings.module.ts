import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { Ranking } from 'src/database/entitites/rankings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from 'src/database/entitites/fighters.entity';
import { RankingsResolver } from './rankings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Fighter])],
  providers: [RankingsService, RankingsResolver],
})
export class RankingsModule {}
