import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';

@Module({
  providers: [FightsService],
  controllers: [],
})
export class FightsModule {}
