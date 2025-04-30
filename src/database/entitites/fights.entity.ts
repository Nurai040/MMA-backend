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
import { Event } from './events.entity';

@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fighter, (fighter) => fighter.fightsAsFighter, {
    eager: true,
  })
  @JoinColumn({ name: 'fighter_id' })
  fighter: Fighter;

  @ManyToOne(() => Fighter, (fighter) => fighter.fightsAsOpponent, {
    eager: true,
  })
  @JoinColumn({ name: 'opponent_id' })
  opponet: Fighter;

  @ManyToOne(() => Event, (event) => event.fights, {
    eager: true,
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ type: 'enum', enum: ['win', 'loss', 'draw'] })
  result: 'win' | 'loss' | 'draw';

  @Column({ nullable: false })
  fight_date: Date;

  @Column({ nullable: true })
  method: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
