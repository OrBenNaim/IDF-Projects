import { Controller, Post, Body, Get, Delete, Param, Put, InternalServerErrorException, UseGuards, ConflictException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateToDoItemCommand } from '../application/commands/create-ToDo-item.command';
import { GetAllToDosPerUserQuery } from 'src/todos/application/queries/getAllToDosPerUser.query';
import { GetToDoItemByIdQuery } from 'src/todos/application/queries/getToDoItemById.query';
import { UpdateToDoItemByIdCommand } from 'src/todos/application/commands/updateToDoItemById.command';
import { DeleteAllToDosPerUserCommand } from 'src/todos/application/commands/delete-all-ToDo-items.command';
import { DeleteToDoItemByIdCommand } from 'src/todos/application/commands/delete-ToDo-item-by-id.command';
import { CreateToDoItemDto, UpdateToDoItemDto } from 'src/todos/application/dto/todo.dto';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';


@UseGuards(JwtGuard)
@Controller('todos')
export class ToDosController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createToDoList(@GetUser('id') userId: number, @Body() createToDoItemDto: CreateToDoItemDto): Promise<ToDoEntity> {
    
    try {
      console.log("\nCreating item for user with id: ", userId);
      return await this.commandBus.execute(new CreateToDoItemCommand(createToDoItemDto, userId));
    } 
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get()
  async getAllToDosPerUser(@GetUser('id') userId: number): Promise<ToDoEntity[]> {
    return await this.queryBus.execute(new GetAllToDosPerUserQuery(userId));
  }


  @Get(':id')
  async getToDoItemById(@Param('id') id: number): Promise<ToDoEntity> {
    return await this.queryBus.execute(new GetToDoItemByIdQuery(id));
  }


  @Put()
  async updateToDoItemById(@GetUser('id') userId: number, @Body() updateToDoItemDto: UpdateToDoItemDto): Promise<ToDoEntity> {
    try {
      console.log("\nUpdating item with id: ", updateToDoItemDto.id); 
      return await this.commandBus.execute(new UpdateToDoItemByIdCommand(userId, updateToDoItemDto));
    }
    catch (error) {
      console.log(error);
      throw error;
    }
      
  }


  @Delete()
  async deleteAllToDosPerUser(@GetUser('id') userId: number): Promise<void> {
    console.log("\nDeleting all items for user with id: ", userId);
    await this.commandBus.execute(new DeleteAllToDosPerUserCommand(userId));
  }


  @Delete(':id')
  async deleteToDoItem(@Param('id') id: number): Promise<void> {
    console.log("\nDeleting item with id: ", id);
    await this.commandBus.execute(new DeleteToDoItemByIdCommand(id));
  }
}
