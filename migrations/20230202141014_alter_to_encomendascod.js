/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable ("encomendas",(table)=>{
        
        table.string('code',255).notNullable().unique();
       
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("encomendas",(table)=>{
         table.dropColumn('code');
    })
    

};
