import { Module } from '@nestjs/common';
import { FighterService } from './fighters.service';
import { FighterResolver } from './fighters.resolver';
import { Fighter } from 'src/database/entitites/fighters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FighterService, FighterResolver],
})
export class FightersModule {}
