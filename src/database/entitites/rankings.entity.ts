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
import { Fight } from './fights.entity';
import { Fighter } from './fighters.entity';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fighter, (fighter) => fighter.ranking, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fighter_id' })
  fighter: Fighter;

  @Column({ nullable: false })
  weight_class: string;

  @Column({ nullable: false })
  rank: number;

  @UpdateDateColumn()
  updated_at: Date;
}
