import { AfterInsert, AfterRemove, AfterUpdate, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    email: string
    @Column()
    password: string

    @AfterInsert()
    logInsert() {
        console.log(`User ${this.name} id: ${this.id} telah dibuat`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`User ${this.name} id: ${this.id} telah diupdate`);
    }
    @AfterRemove()
    LogRemove() {
        console.log(`User ${this.name} id: ${this.id} telah dihapus`);
    }
}