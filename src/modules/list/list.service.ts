import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  createList(createListDto: CreateListDto) {
    return createListDto;
  }

  retrieveList(id: string) {
    return `This action returns a #${id} list`;
  }

  updateList(id: string, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list ${updateListDto}`;
  }

  deleteList(id: string) {
    return `This action removes a #${id} list`;
  }
}
