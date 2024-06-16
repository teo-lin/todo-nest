import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { User } from './entities/user.entity';
import { Database, MaskedUser } from '../interfaces';

@Injectable()
export class UserService {
  createUser(userData: CreateUserDto): MaskedUser {
    const data: Database = DatabaseService.getData();
    const nextUserId: string = `U${1 + Number(data.lastUserId.slice(1))}`;
    const user: User = { userId: nextUserId, ...userData };

    data.users.push(user);
    data.lastUserId = nextUserId;
    DatabaseService.setData(data);

    return {
      userId: user.userId,
      username: user.username,
      fullname: user.fullname,
    };
  }

  retrieveUser(userId: string): MaskedUser {
    const data: Database = DatabaseService.getData();
    const user: User | undefined = data.users.find((user: User) => user.userId === userId);

    if (!user) throw new Error('Not Found');
    else {
      return {
        userId: user.userId,
        username: user.username,
        fullname: user.fullname,
      };
    }
  }

  updateUser(userId: string, userData: UpdateUserDto): MaskedUser {
    const data: Database = DatabaseService.getData();
    const userIndex: number = data.users.findIndex((user: User) => user.userId === userId);
    if (userIndex === -1) throw new Error('Not Found');
    const user: User = { ...data.users[userIndex], ...userData };

    data.users[userIndex] = user;
    DatabaseService.setData(data);

    return {
      userId: user.userId,
      username: user.username,
      fullname: user.fullname,
    };
  }

  deleteUser(userId: string): void {
    const data: Database = DatabaseService.getData();
    const totalRecords = data.users.length;

    data.users = data.users.filter((user: User) => user.userId !== userId);
    if (totalRecords === data.users.length) throw new Error('Not Found');
    else DatabaseService.setData(data);
  }
}
