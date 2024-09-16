
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ship } from '../ships/ships.entity';

@Entity('ports')
export class Port {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  limit: number;

  @OneToMany(() => Ship, (ship) => ship.port)
  ships: Ship[];
}
