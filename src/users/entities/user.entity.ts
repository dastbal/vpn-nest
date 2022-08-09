import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Minute } from './minute.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'common_name', type: 'varchar', length: 255 })
  commonName: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'datetime',
  })
  createAt: Date;
  @OneToMany(() => Minute, (minute) => minute.user)
  minutes: Minute[];
}
