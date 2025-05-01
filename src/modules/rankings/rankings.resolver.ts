import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Ranking } from 'src/database/entitites/rankings.entity';
import { RankingsService } from './rankings.service';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';

@Resolver(() => Ranking)
export class RankingsResolver {
  constructor(private readonly rankingsService: RankingsService) {}

  @Mutation(() => Ranking)
  async create(
    @Args('createRankingInput') createRankingInput: CreateRankingInput,
  ) {
    return await this.rankingsService.addRanking(createRankingInput);
  }

  @Query(() => [Ranking], { name: 'rankings' })
  async findAll() {
    return await this.rankingsService.findAll();
  }

  @Query(() => Ranking, { name: 'ranking' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.rankingsService.findOne(id);
  }

  @Mutation(() => Ranking)
  async updateFight(
    @Args('updateRankingInput') updateRankingInput: UpdateRankingInput,
  ) {
    return await this.rankingsService.updateRanking(
      updateRankingInput.id,
      updateRankingInput,
    );
  }

  @Mutation(() => Ranking)
  async deleteFight(@Args('id', { type: () => Int }) id: number) {
    return await this.rankingsService.delete(id);
  }
}
