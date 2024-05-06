import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  retrieveUser(id: string) {
    return `This action returns a #${id} user`;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${updateUserDto}`;
  }

  deleteUser(id: string) {
    return `This action removes a #${id} user`;
  }
}
