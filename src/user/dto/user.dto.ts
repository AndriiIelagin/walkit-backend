import { IsDefined, IsString, IsEmail } from 'class-validator';
import { UserRole } from '../user.entity';

export class UserDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;

  // @IsString()
  // @IsDefined()
  // role: UserRole;
}
