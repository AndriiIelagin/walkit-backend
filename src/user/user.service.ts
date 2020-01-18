import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['geolocations'],
    });
    return users;
  }

  async findSpecificUsers(params): Promise<User[]> {
    const users = await this.userRepository.find({
      where: params,
    });
    return users;
  }

  async findUserBy(params): Promise<User> {
    return await this.userRepository.findOne({
      where: params,
    });
  }

  async addUser(userData: UserDto): Promise<User> {
    return await this.userRepository.save(userData);
  }

  async updateUser(userData: UserDto, id) {
    const user = await this.findUserBy({ id });
    return this.userRepository.update(user, userData);
  }

  async removeUser(id) {
    const user = await this.findUserBy({ id });
    return this.userRepository.remove(user);
  }
}
