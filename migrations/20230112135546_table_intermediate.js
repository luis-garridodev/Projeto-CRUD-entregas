/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("user_companies",(table)=>{
    table.integer('user_id').unsigned().references("id").inTable("users");
    table.integer('company_id').unsigned().references("id").inTable("companies");
    

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_companies');
};

