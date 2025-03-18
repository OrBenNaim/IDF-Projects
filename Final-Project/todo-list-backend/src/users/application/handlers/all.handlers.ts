import { GetAllUsersHandler } from 'src/users/application/handlers/getAllUsers.handler';

import { GetUserByNameHandler } from 'src/users/application/handlers/getUser.handler';

import { UpdateUserHandler } from 'src/users/application/handlers/updateUser.handler';

import { DeleteUserHandler } from 'src/users/application/handlers/deleteUser.handler';

import { DeleteAllUsersHandler } from 'src/users/application/handlers/deleteAllUsers.handler';

import { CreateNewUserHandler } from './createNewUser.handler';


export const CommandHandlers = [
    CreateNewUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    DeleteAllUsersHandler,
  ];
  
  export const QueryHandlers = [
    GetAllUsersHandler,
    GetUserByNameHandler,
  ];
  