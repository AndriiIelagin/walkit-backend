import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  // @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
