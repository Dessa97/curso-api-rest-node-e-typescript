import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.cidade, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).checkLength('<=', 150).index().notNullable();

      table.comment("tabela usada para armazenar cidades do sistema");
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.cidade}`);
    });
}
//exclui a tabela
export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.cidade)

    .then(() => {
      console.log(`# Drop table ${ETableNames.cidade}`);
    });
}
