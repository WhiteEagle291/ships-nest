
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ship } from '../ships/ships.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Ship, (ship) => ship.users, { nullable: true })
  @JoinColumn({ name: 'shipId' })
  ship?: Ship;  

  @Column({ nullable: true })
  shipId?: number; 
}
