import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fighter } from './fighters.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Ranking {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, (fighter) => fighter.ranking, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fighter_id' })
  fighter: Fighter;

  @Field()
  @Column({ nullable: false })
  weight_class: string;

  @Field()
  @Column({ nullable: false })
  rank: number;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
