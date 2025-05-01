import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Fight } from 'src/database/entitites/fights.entity';
import { FightsService } from './fights.service';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Resolver(() => Fight)
export class FightResolver {
  constructor(private readonly fightsService: FightsService) {}

  @Mutation(() => Fight)
  async create(@Args('createFightInput') createFightInput: CreateFightInput) {
    return await this.fightsService.addFight(createFightInput);
  }

  @Query(() => [Fight], { name: 'fights' })
  async findAll() {
    return await this.fightsService.findAll();
  }

  @Query(() => Fight, { name: 'fight' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.fightsService.findOne(id);
  }

  @Mutation(() => Fight)
  async updateFight(
    @Args('updateFightInput') updateFightInput: UpdateFightInput,
  ) {
    return await this.fightsService.updateFight(
      updateFightInput.id,
      updateFightInput,
    );
  }

  @Mutation(() => Fight)
  async deleteFight(@Args('id', { type: () => Int }) id: number) {
    return await this.fightsService.delete(id);
  }
}
