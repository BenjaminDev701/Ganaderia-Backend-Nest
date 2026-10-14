import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("animals")
export class Animal {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true, type: "varchar", length: 20, nullable: false })
    tag_number: string

    @Column({ type: "varchar", nullable: false, enum: ["Equino", "Bovino", "Porcino"] })
    species: string

    @Column({ type: "varchar", nullable: true })
    name: string

    @Column({ type: "varchar", nullable: true })
    breed: string

    @Column({ type: "varchar", nullable: false, enum: ["Macho", "Hembra"] })
    gender: string

    @Column({ type: "decimal", nullable: true })
    weight_kg: number

    @Column({ type: "date", nullable: true })
    birth_date: Date

    @Column({ type: "varchar", nullable: false, enum: ["VIVO", "MUERTO"], default: "VIVO" })
    status: string
}
