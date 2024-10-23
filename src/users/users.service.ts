import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    create(name: string, email: string, password: string) {
        const user = this.userRepository.create({ name, email, password })
        return this.userRepository.save(user)
    }

    find() {
        return this.userRepository.find()
    }

    // Error
    /*
        [Nest] ERROR [ExceptionsHandler] SQLITE_ERROR: no such column: NaN
        QueryFailedError: SQLITE_ERROR: no such column: NaN
        at handler (C:\myex-nest\node_modules\typeorm\driver\src\driver\sqlite\SqliteQueryRunner.ts:135:29)
        at replacement (C:\myex-nest\node_modules\sqlite3\lib\trace.js:25:27)
        at Statement.errBack (C:\myex-nest\node_modules\sqlite3\lib\sqlite3.js:15:21)
    */
    findByEmail(email: string) {
        return this.userRepository.find({
            where: {
                email
            }
        })
    }

    async findOneBy(id: number) {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOneBy(id)
        Object.assign(user, attrs)
        return this.userRepository.save(user)
    }

    async remove(id: number) {
        const user = await this.findOneBy(id)
        return this.userRepository.remove(user)
    }
}