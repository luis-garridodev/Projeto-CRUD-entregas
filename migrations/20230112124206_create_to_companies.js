/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("companies",(table)=>{
    table.increments('id').primary();
    table.string('title',255).notNullable();
    table.string('sector',255).notNullable();
    table.string('cnpj',255).notNullable();
    

    



  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('companies');
};
