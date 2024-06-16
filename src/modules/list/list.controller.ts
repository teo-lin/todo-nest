import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('create')
  createList(@Body() createListDto: CreateListDto) {
    return this.listService.createList(createListDto);
  }

  @Get('list/:id')
  retrieveList(@Param('id') id: string) {
    return this.listService.retrieveList(id);
  }

  @Put('list/:id')
  updateList(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.updateList(id, updateListDto);
  }

  @Delete('list/:id')
  deleteList(@Param('id') id: string) {
    this.listService.deleteList(id);
    return { message: 'List deleted successfully' };
  }
}
