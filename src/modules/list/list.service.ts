import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { DatabaseService } from '../database/database.service';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createList(createListDto: CreateListDto) {
    const data = this.databaseService.getData();
    const nextListId = `L${1 + Number(data.lastListId.slice(1))}`;
    const newList = { listId: nextListId, ...createListDto };
    data.lists.push(newList);
    data.lastListId = nextListId;
    this.databaseService.setData(data);
    return newList;
  }

  async retrieveList(listId: string) {
    const data = this.databaseService.getData();
    const list = data.lists.find((list: List) => list.listId === listId);
    if (!list) throw new Error('List not found');
    return list;
  }

  async updateList(listId: string, updateListDto: UpdateListDto) {
    const data = this.databaseService.getData();
    const listIndex = data.lists.findIndex((list: List) => list.listId === listId);
    if (listIndex === -1) throw new Error('List not found');
    data.lists[listIndex] = { ...data.lists[listIndex], ...updateListDto };
    this.databaseService.setData(data);
    const list = data.lists[listIndex];
    return list;
  }

  async deleteList(listId: string) {
    const data = this.databaseService.getData();
    data.lists = data.lists.filter((list: List) => list.listId !== listId);
    this.databaseService.setData(data);
    return { message: 'List deleted successfully' };
  }
}
