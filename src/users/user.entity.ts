import { Exclude } from "class-transformer"
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    @Exclude()
    password: string

    @AfterInsert()
    logInsert() {
        console.log(`ID: ${this.id} telah dibuat`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`ID: ${this.id} telah diupdate`);
    }

    @AfterRemove()
    LogRemove() {
        // Id tidak terambil
        console.log(`ID: ${this.id} telah dihapus`);
    }
}