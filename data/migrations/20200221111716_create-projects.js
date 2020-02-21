
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl.string('project_name', 128)
        .unique()
        .notNullable();
      tbl.string('project_description', 128)
        .notNullable();
      tbl.boolean('completed')
        .notNullable();
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.integer('task_number')
        .unsigned()
        .notNullable();
      tbl.string('task_name')
        .unique()
        .notNullable();
      tbl.string('instructions', 256)
        .notNullable();
      tbl.string('notes', 256)
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
      tbl.string('resource_name', 128)
        .notNullable();
      tbl.string('resource_description', 256)
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
