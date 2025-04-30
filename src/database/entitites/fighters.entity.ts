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

@Entity()
export class Fighter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 0, nullable: false })
  wins: number;

  @Column({ default: 0, nullable: false })
  losses: number;

  @Column({ default: 0, nullable: false })
  knockouts: number;

  @Column({ default: 0, nullable: false })
  submissions: number;

  @Column({ nullable: false })
  weight_class: string;

  @Column({ nullable: false })
  nationality: string;

  @Column({ nullable: true })
  team: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Fight, (fight) => fight.fighter)
  fightsAsFighter: Fight[];

  @OneToMany(() => Fight, (fight) => fight.opponet)
  fightsAsOpponent: Fight[];

  @OneToMany(() => Ranking, (rank) => rank.fighter)
  ranking: Ranking[];
}
