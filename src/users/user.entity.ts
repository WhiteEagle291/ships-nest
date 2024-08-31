// src/users/user.entity.ts
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
  ship?: Ship;  // Optional property

  @Column({ nullable: true })
  shipId?: number; // Optional, if you want to store the ship ID in the user
}
