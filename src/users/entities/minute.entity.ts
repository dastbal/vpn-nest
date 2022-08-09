import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'minutes' })
export class Minute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: null })
  since: Date;
  @Column({ type: 'bool' })
  status: boolean;

  @Column({ name: 'bytes_received', type: 'varchar', length: 255 })
  bytesReceived: string;
  @Column({ name: 'bytes_sent', type: 'varchar', length: 255 })
  bytesSent: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'datetime',
  })
  createAt: Date;

  @ManyToOne(() => User, (user) => user.minutes)
  user: User;
}
