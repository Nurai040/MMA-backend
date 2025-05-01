import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightResolver } from './fights.resolver';
import { Fight } from 'src/database/entitites/fights.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from 'src/database/entitites/fighters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fight, Fighter])],
  providers: [FightResolver, FightsService],
})
export class FightsModule {}
