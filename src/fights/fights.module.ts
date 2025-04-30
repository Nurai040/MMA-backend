import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightsController } from './fights.controller';

@Module({
  providers: [FightsService],
  controllers: [FightsController]
})
export class FightsModule {}
