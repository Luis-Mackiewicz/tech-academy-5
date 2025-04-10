import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationships1744281972407 implements MigrationInterface {
  name = "UpdateRelationships1744281972407";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remova apenas as chaves estrangeiras existentes
    await queryRunner.query(
      `ALTER TABLE \`task\` DROP FOREIGN KEY IF EXISTS \`FK_f316d3fe53497d4d8a2957db8b9\``
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP FOREIGN KEY IF EXISTS \`FK_7c4b0d3b77eaf26f8b4da879e63\``
    );

    // Alterações nas colunas
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`userId\` \`assignedToId\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP COLUMN \`createdBy\``
    );
    await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`creatorId\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`description\` \`description\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`projectId\` \`projectId\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`assignedToId\` \`assignedToId\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`description\` \`description\` varchar(255) NULL`
    );

    // Recriação das chaves estrangeiras
    await queryRunner.query(
      `ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3797a20ef5553ae87af126bc2fe\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` ADD CONSTRAINT \`FK_fd5f652e2fcdc4a5ab30aaff7a7\` FOREIGN KEY (\`assignedToId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_cfb02dac45e9dec5b82f960b3e3\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverte as alterações feitas no método up
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_cfb02dac45e9dec5b82f960b3e3\``
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_fd5f652e2fcdc4a5ab30aaff7a7\``
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_3797a20ef5553ae87af126bc2fe\``
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`assignedToId\` \`assignedToId\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`projectId\` \`projectId\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP COLUMN \`creatorId\``
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`userId\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`createdBy\` int NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` CHANGE \`assignedToId\` \`userId\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_7c4b0d3b77eaf26f8b4da879e63\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` ADD CONSTRAINT \`FK_f316d3fe53497d4d8a2957db8b9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3797a20ef5553ae87af126bc2fe\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
