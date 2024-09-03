// src/ships/create-ship.dto.ts
export class CreateShipDto {
  name: string;
  type: string;
  crew: string[];
  portId: number; // Ensure portId is included
}