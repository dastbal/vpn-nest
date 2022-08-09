import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'days' })
export class Day {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'minute_of_day', type: 'int' })
  minutesOfDay: number;
  @Column({ name: 'bytes_sent_of_day', type: 'int' })
  bytesSentOfDay: number;
  @Column({ name: 'bytes_received_of_day', type: 'int' })
  bytesReceivedOfDay: number;
  @CreateDateColumn({
    name: 'create_at',
    type: 'datetime',
  })
  createAt: Date;
  @ManyToOne(() => User, (user) => user.days)
  user: User;
}
