import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().notNullable().unique();
    table.string('name');
    table.string('email');
    table.string('password');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('users');
}