
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Port } from '../ports/port.entity';
import { User } from '../users/user.entity';

@Entity()
export class Ship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Unnamed Ship' })
  name: string;

  @Column({ default: 'Unknown Type' })
  type: string;

  @Column("text", { array: true, default: () => 'ARRAY[]::text[]' })
  crew: string[];

  @ManyToOne(() => Port, (port) => port.ships, { nullable: false })
@JoinColumn({ name: 'portId' })
port: Port;
  @OneToMany(() => User, (user) => user.ship)
  users: User[];
}
