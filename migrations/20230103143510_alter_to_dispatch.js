/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable("dispatch",(table)=>{
        table.integer('user_id').unsigned().references("id").inTable("users");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("dispatch",(table)=>{
        table.dropForeign('user_id');
        table.dropColumn('user_id');

    })
};
