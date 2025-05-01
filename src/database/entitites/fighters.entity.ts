import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fight } from './fights.entity';
import { Ranking } from './rankings.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Fighter {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ default: 0, nullable: false })
  wins: number;

  @Field()
  @Column({ default: 0, nullable: false })
  losses: number;

  @Field()
  @Column({ default: 0, nullable: false })
  knockouts: number;

  @Field()
  @Column({ default: 0, nullable: false })
  submissions: number;

  @Field()
  @Column({ nullable: false })
  weight_class: string;

  @Field()
  @Column({ nullable: false })
  nationality: string;

  @Field()
  @Column({ nullable: true })
  team: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => [Fight], { nullable: true })
  @OneToMany(() => Fight, (fight) => fight.fighter)
  fightsAsFighter: Fight[];

  @Field(() => [Fight], { nullable: true })
  @OneToMany(() => Fight, (fight) => fight.opponet)
  fightsAsOpponent: Fight[];

  @Field(() => [Ranking], { nullable: true })
  @OneToMany(() => Ranking, (rank) => rank.fighter)
  ranking: Ranking[];
}
