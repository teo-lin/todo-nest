import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  createUser(createUserDto: CreateUserDto) {
    const data = this.databaseService.getData();
    const nextUserId = `U${1 + Number(data.lastUserId.slice(1))}`;
    const user = { userId: nextUserId, ...createUserDto };
    data.users.push(user);
    data.lastUserId = nextUserId;
    this.databaseService.setData(data);
    delete user.password;
    return user;
  }

  retrieveUser(userId: string) {
    const data = this.databaseService.getData();
    const user = data.users.find((user: User) => user.userId === userId);
    if (!user) throw new Error('User not found');
    delete user.password;
    return user;
  }

  updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const data = this.databaseService.getData();
    const userIndex = data.users.findIndex((user: User) => user.userId === userId);
    if (userIndex === -1) throw new Error('User not found');
    data.users[userIndex] = { ...data.users[userIndex], ...updateUserDto };
    this.databaseService.setData(data);
    const user = data.users[userIndex];
    delete user.password;
    return user;
  }

  deleteUser(userId: string) {
    const data = this.databaseService.getData();
    data.users = data.users.filter((user: User) => user.userId !== userId);
    this.databaseService.setData(data);
    return { message: 'User deleted successfully' };
  }
}
