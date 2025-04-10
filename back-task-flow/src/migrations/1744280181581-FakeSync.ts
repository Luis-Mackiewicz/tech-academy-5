import { MigrationInterface, QueryRunner } from "typeorm";

export class FakeSync1744280181581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
