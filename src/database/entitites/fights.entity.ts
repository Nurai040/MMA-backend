import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fighter } from './fighters.entity';
import { EventMma } from './events.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Fight {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, (fighter) => fighter.fightsAsFighter, {
    eager: true,
  })
  @JoinColumn({ name: 'fighter_id' })
  fighter: Fighter;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, (fighter) => fighter.fightsAsOpponent, {
    eager: true,
  })
  @JoinColumn({ name: 'opponent_id' })
  opponent: Fighter;

  @Field(() => EventMma)
  @ManyToOne(() => EventMma, (event) => event.fights, {
    eager: true,
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Field()
  @Column({ type: 'enum', enum: ['win', 'loss', 'draw'] })
  result: 'win' | 'loss' | 'draw';

  @Field()
  @Column({ nullable: false })
  fight_date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  method: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
