
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {project_name: 'Project 1', project_description: 'Test Project 1!', completed: 0},
        {project_name: 'Project 2', project_description: 'Test Project 2!', completed: 0}
      ]);
    });
};
