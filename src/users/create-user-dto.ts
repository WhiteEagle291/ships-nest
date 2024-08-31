// src/users/create-user.dto.ts
export class CreateUserDto {
  username: string;
  password: string;
  shipId?: number; // Optional if it's not always required
}