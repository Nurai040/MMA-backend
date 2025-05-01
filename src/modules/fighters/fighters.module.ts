import { Module } from '@nestjs/common';
import { FightersService } from './fighters.service';

@Module({
  providers: [FightersService],
  controllers: [],
})
export class FightersModule {}
