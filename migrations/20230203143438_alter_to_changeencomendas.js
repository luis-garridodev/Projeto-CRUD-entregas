/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable("encomendas", (table) => {
        table.timestamp('avaliable_at').nullable().defaultTo(null).alter();
        table.timestamp('delivered_at').nullable().defaultTo(null).alter(); 
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("encomendas", (table) => {
    table.timestamp('avaliable_at').defaultTo(knex.fn.now()).alter();
        table.timestamp('delivered_at').defaultTo(knex.fn.now()).alter();;
    })
};
