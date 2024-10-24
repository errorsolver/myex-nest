import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOneBy(parseInt(id))
    }

    @Get()
    findAllUsers() {
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
}
