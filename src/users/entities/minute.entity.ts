import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'minutes' })
export class Minute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: null })
  since: Date;
  @Column({ type: 'bool' })
  status: boolean;

  @Column({ name: 'bytes_recieved', type: 'int', width: 200 })
  bytesRecieved: number;
  @Column({ name: 'bytes_sent', type: 'int', width: 200 })
  bytesSent: number;

  @CreateDateColumn({
    name: 'create_at',
    type: 'datetime',
  })
  createAt: Date;
  //   @UpdateDateColumn({
  //     name: 'update_at',
  //     // type: 'timestamptz',
  //     default: () => 'CURRENT_TIMESTAMP',
  //   })
  //   updateAt: Date;
}
