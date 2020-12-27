import {MigrationInterface, QueryRunner} from "typeorm";

export class User1609056167762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `dateUpdated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `isActive` tinyint NULL DEFAULT 1, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
