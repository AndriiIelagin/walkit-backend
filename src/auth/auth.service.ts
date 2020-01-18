import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findUserBy({ email: payload });
    return user;
  }

  async login({ email, password }): Promise<{ data: { token: string } }> {
    const user: User = await this.usersService.findUserBy({ email });
    if (user && user.password === password) {
      const token: string = this.jwtService.sign(user.email);
      return { data: { token } };
    }
    throw new UnauthorizedException();
  }
}
