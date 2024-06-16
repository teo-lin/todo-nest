import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { DatabaseService } from '../database/database.service';
import { List } from './entities/list.entity';
import { Database } from '../interfaces';

@Injectable()
export class ListService {
  createList(listData: CreateListDto) {
    const data: Database = DatabaseService.getData();
    const nextListId: string = `L${1 + Number(data.lastListId.slice(1))}`;
    const list: List = { listId: nextListId, ...listData };

    data.lists.push(list);
    data.lastListId = nextListId;
    DatabaseService.setData(data);

    return list;
  }

  retrieveList(listId: string): List {
    const data: Database = DatabaseService.getData();

    const list: List | undefined = data.lists.find((list: List) => list.listId === listId);
    if (!list) throw new Error('Not Found');
    else return list;
  }

  updateList(listId: string, listData: UpdateListDto): List {
    const data: Database = DatabaseService.getData();
    const listIndex: number = data.lists.findIndex((list: any) => list.listId === listId);
    if (listIndex === -1) throw new Error('Not Found');
    const list: List = { ...data.lists[listIndex], ...listData };

    data.lists[listIndex] = list;
    DatabaseService.setData(data);

    return list;
  }

  deleteList(listId: string): void {
    const data: Database = DatabaseService.getData();
    const totalRecords = data.lists.length;

    data.lists = data.lists.filter((list: List) => list.listId !== listId);
    if (totalRecords === data.lists.length) throw new Error('Not Found');
    else DatabaseService.setData(data);
  }
}
