import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('create')
  async createList(@Body() createListDto: CreateListDto) {
    return await this.listService.createList(createListDto);
  }

  @Get('list/:id')
  async retrieveList(@Param('id') id: string) {
    return await this.listService.retrieveList(id);
  }

  @Put('list/:id')
  async updateList(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return await this.listService.updateList(id, updateListDto);
  }

  @Delete('list/:id')
  async deleteList(@Param('id') id: string) {
    return await this.listService.deleteList(id);
  }
}
