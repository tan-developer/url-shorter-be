// UserLoginDto (as before)

import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCredentialDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
