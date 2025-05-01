import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';

@Module({
  providers: [RankingsService],
  controllers: [],
})
export class RankingsModule {}
