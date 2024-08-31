export class CreateShipDto {
    name: string;
    type: string;
    portId: number; // Assuming the portId is a foreign key
    crew: string[];
  }