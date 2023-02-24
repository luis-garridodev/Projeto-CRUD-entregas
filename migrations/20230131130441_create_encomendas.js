/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("encomendas",(table)=>{
    table.increments('id').primary();
    table.integer('user_id').unsigned().references("id").inTable("users");
    table.integer('companie_id').unsigned().references("id").inTable("companies");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('encomendas');
};
