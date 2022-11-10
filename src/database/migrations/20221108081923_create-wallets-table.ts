import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('wallets', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().notNullable().unique();
    table.decimal('balance', 10, 2).defaultTo(0.00);
    table.uuid('userId').references('id').inTable('users');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('wallets');
}