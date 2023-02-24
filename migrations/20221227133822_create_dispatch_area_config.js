/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("dispatch",(table)=>{
    table.increments('id').primary();
    table.string('type',255).notNullable();
    table.string('subtype',255).notNullable();
    table.string('area',255).notNullable();
    table.string('dispatchgroup',255).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('dispatch');
};
