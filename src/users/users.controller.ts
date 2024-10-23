import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get(':id')
    @UseInterceptors(new SerializeInterceptor(UserDto))
    findUser(@Param('id') id: string) {
        console.log('findUser');

        return this.usersService.findOneBy(parseInt(id))
    }

    @Get()
    @UseInterceptors(new SerializeInterceptor(UserDto))
    findAllUsers() {
        console.log('findAllUser');
        return this.usersService.find()
    }

    // Error
    /*
        [Nest] ERROR [ExceptionsHandler] SQLITE_ERROR: no such column: NaN
        QueryFailedError: SQLITE_ERROR: no such column: NaN
        at handler (C:\myex-nest\node_modules\typeorm\driver\src\driver\sqlite\SqliteQueryRunner.ts:135:29)
        at replacement (C:\myex-nest\node_modules\sqlite3\lib\trace.js:25:27)
        at Statement.errBack (C:\myex-nest\node_modules\sqlite3\lib\sqlite3.js:15:21)
    */
    @Get('email')
    findAllUsersByEmail(@Query('email') email: string) {
        return this.usersService.findByEmail(email)
    }

    @Post()
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body.name, body.email, body.password)
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body)
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id))
    }
}
