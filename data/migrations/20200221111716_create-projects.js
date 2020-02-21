
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl.text('project_name', 128)
        .unique()
        .notNullable();
      tbl.text('project_description', 128)
        .notNullable();
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.integer('task_number')
        .unsigned()
        .notNullable();
      tbl.varchar('task_name')
        .unique()
        .notNullable();
      tbl.varchar('instructions', 256)
        .notNullable();
      tbl.varchar('notes', 256)
        .defaultTo(knex.raw('none'));
      tbl.boolean('completed')
        .notNullable();
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('resources', tbl => {
      tbl.increments();
      tbl.integer('resource_id')
        .unsigned()
        .notNullable();
      tbl.varchar('resource_name', 128)
        .notNullable();
      tbl.varchar('resource_description', 256)
        .defaultTo(knex.raw('none'));
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
