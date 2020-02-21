
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {project_id: 1, resource_id: 1, resource_name: 'computer', resource_description: 'Powerful Computer for coding.'},
        {project_id: 1, resource_id: 2, resource_name: 'mouse', resource_description: 'Powerful Mouse for coding.'},
        {project_id: 1, resource_id: 3, resource_name: 'keyboard', resource_description: 'Powerful Keyboard for coding.'},
      ]);
    });
};
