import { Column, Entity, PrimaryColumn } from "typeorm";

//El objeto literal en el decorador hace referencia a una tabla existente en la BD
@Entity({name : 'users'})
export class User{

    @PrimaryColumn()
    identificacion_document : string;

    @Column({
        type : 'integer',
        default : 2, // Usuario tipo cliente
        nullable : true
    })
    type_rol : number;

    @Column({
        type : 'text',
    })
    name : string;

    @Column({
        type : 'text',
    })
    last_name : string;

    @Column({
        type : 'text',
    })
    type_document : string;

    @Column({
        type : 'text',
        unique : true
    })
    email : string;

    @Column({
        type : 'text',
        nullable : true
    })
    password : string;
}
