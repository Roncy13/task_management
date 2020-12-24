import {Entity, Column} from "typeorm";
import { BaseEntity } from "./base-entity";
import "reflect-metadata";
import { VARCHAR_STR } from "@utilities/constants";

@Entity()
export class User extends BaseEntity {

    @Column({
      length: VARCHAR_STR.MAX_LENGTH
    })
    idUser: string;

    @Column({
      length: VARCHAR_STR.MAX_LENGTH
    })
    userName: string;

    @Column({
      length: VARCHAR_STR.MAX_LENGTH
    })
    password: string;

    @Column({
      length: VARCHAR_STR.MAX_LENGTH,
      nullable: true,
    })
    token: string;

    @Column({
      length: VARCHAR_STR.MAX_LENGTH
    })
    salt: string;
}