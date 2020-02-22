
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {project_id: 1, task_number: 1, task_name: 'Create a database in sqlite3', instructions: 'Don\'t forget!', notes: '', completed: 'false'},
        {project_id: 1, task_number: 2, task_name: 'Test CRUD operations', instructions: 'Don\'t forget!', notes: '', completed: 'false'},
        {project_id: 1, task_number: 3, task_name: 'Turn in assignment', instructions: 'Don\'t forget!', notes: '', completed: 'false'},
        {project_id: 2, task_number: 1, task_name: 'Test some more!', instructions: 'Don\'t forget!', notes: '', completed: 'false'}
      ]);
    });
};
