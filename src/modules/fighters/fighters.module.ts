import { Module } from '@nestjs/common';
import { FightersService } from './fighters.service';
import { FightersController } from './fighters.controller';

@Module({
  providers: [FightersService],
  controllers: [FightersController]
})
export class FightersModule {}
