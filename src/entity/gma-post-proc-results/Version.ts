import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Version {
    @PrimaryColumn('integer')
    version_no: number;
}
