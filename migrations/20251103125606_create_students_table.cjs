exports.up = function(knex) {
    return knex.schema.createTable("students", (table) => {
        table.increments("id").primary();
        table.string("name", 100).notNullable();
        table.string("email", 150).notNullable().unique();
        table.string("course", 100).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("students");
};