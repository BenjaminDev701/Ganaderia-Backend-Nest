import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum.js";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 30 })
    name: string

    @Column({ unique: true, type: "varchar" })
    email: string

    //*select: false  para que no mande la contraseña 
    @Column({ nullable: false, type: "varchar", select: false })
    password: string

    //*Role = trabajador como default
    @Column({ type: "enum", enum: Role, default: Role.TRABAJADOR })
    role: Role
}
