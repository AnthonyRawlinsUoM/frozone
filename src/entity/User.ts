import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Example, Description} from "@tsed/swagger";
import {Minimum, Required, Property} from "@tsed/common";

@Entity()
export class User {

    @Description('Database assigned id')
    @PrimaryGeneratedColumn()
    id: number;

    @Description('User first name')
    @Required()
    @Column()
    firstName: string;

    @Description('User last name')
    @Required()
    @Column()
    lastName: string;

    @Description('User age')
    @Required()
    @Minimum(18)
    @Column()
    age: number;

}
