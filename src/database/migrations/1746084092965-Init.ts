import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746084092965 implements MigrationInterface {
    name = 'Init1746084092965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ranking" ("id" SERIAL NOT NULL, "weight_class" character varying NOT NULL, "rank" integer NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fighter_id" integer, CONSTRAINT "PK_bf82b8f271e50232e6a3fcb09a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fighter" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "wins" integer NOT NULL DEFAULT '0', "losses" integer NOT NULL DEFAULT '0', "knockouts" integer NOT NULL DEFAULT '0', "submissions" integer NOT NULL DEFAULT '0', "weight_class" character varying NOT NULL, "nationality" character varying NOT NULL, "team" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2719a8a2de10cfa27adde3f15db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."fight_result_enum" AS ENUM('win', 'loss', 'draw')`);
        await queryRunner.query(`CREATE TABLE "fight" ("id" SERIAL NOT NULL, "result" "public"."fight_result_enum" NOT NULL, "fight_date" TIMESTAMP NOT NULL, "method" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fighter_id" integer, "opponent_id" integer, "event_id" integer, CONSTRAINT "PK_c6ddb4bcedc3415b9f1b9d07b06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "event_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD CONSTRAINT "FK_a7c4cdeb96d0391fdcce48fb500" FOREIGN KEY ("fighter_id") REFERENCES "fighter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_46ab556b752cf533fd8279a21d7" FOREIGN KEY ("fighter_id") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_efc502912a6ec27b967d9b22b13" FOREIGN KEY ("opponent_id") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_2c942b20311d7a2bbcb286abc37" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_2c942b20311d7a2bbcb286abc37"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_efc502912a6ec27b967d9b22b13"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_46ab556b752cf533fd8279a21d7"`);
        await queryRunner.query(`ALTER TABLE "ranking" DROP CONSTRAINT "FK_a7c4cdeb96d0391fdcce48fb500"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "fight"`);
        await queryRunner.query(`DROP TYPE "public"."fight_result_enum"`);
        await queryRunner.query(`DROP TABLE "fighter"`);
        await queryRunner.query(`DROP TABLE "ranking"`);
    }

}
