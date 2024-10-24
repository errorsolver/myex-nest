import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('email')
    findAllUsersByEmail(@Query('email') email: string) {
        console.log('findByEmail');

        return this.usersService.findByEmail(email)
    }

    @Get(':id')
    findUser(@Param('id') id: string) {
        console.log(':id');

        return this.usersService.findOneBy(parseInt(id))
    }

    @Get()
    findAllUsers() {
        console.log('findall');
        return this.usersService.find()
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

    @Get('auth/current-user')
    @UseGuards(AuthGuard)
    currentUser(@CurrentUser() user: User) {
        return user
    }
}
