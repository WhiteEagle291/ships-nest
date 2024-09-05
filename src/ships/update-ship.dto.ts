// src/ships/update-ship.dto.ts
import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class UpdateShipDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsArray()
  crew?: string[];

  @IsOptional()
  @IsNumber()
  portId?: number; // Optional since not every update will involve changing the port
}
