import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Fighter } from 'src/database/entitites/fighters.entity';
import { FighterService } from './fighters.service';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';

@Resolver(() => Fighter)
export class FighterResolver {
  constructor(private readonly fighterService: FighterService) {}
  @Mutation(() => Fighter)
  async create(
    @Args('createFighterInput') createFighterInput: CreateFighterInput,
  ) {
    return await this.fighterService.addFighter(createFighterInput);
  }

  @Query(() => [Fighter], { name: 'fighters' })
  async findAll() {
    return await this.fighterService.findAll();
  }

  @Query(() => Fighter, { name: 'fighter' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.fighterService.findOne(id);
  }

  @Mutation(() => Fighter)
  async updateFight(
    @Args('updateFighterInput') updateFighterInput: UpdateFighterInput,
  ) {
    return await this.fighterService.updateFighter(
      updateFighterInput.id,
      updateFighterInput,
    );
  }

  @Mutation(() => Fighter)
  async deleteFight(@Args('id', { type: () => Int }) id: number) {
    return await this.fighterService.delete(id);
  }
}
