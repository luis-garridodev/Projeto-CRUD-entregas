/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("encomendas", (table) => {
        table.timestamp('avaliable_at').defaultTo(knex.fn.now());
        table.timestamp('delivered_at').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at').nullable().defaultTo(null);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.table.dropCollumnIfExists('avaliable_at', 'delivered_at', 'created_at', 'updated_at', 'deleted_at')


};
