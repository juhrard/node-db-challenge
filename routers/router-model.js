const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  findTasks,
  findByTaskId,
  findResources,
  findProjectTasks,
  findProjectResources,
  add,
  addTask,
  addResource,
  update,
  updateTask,
  remove,
  removeTask
};

function find() {
  return db("projects");
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function findProjectTasks(id) {
  return db("tasks")
    .join("projects", "projects.id", "tasks.project_id")  
    .select("projects.project_name", "projects.project_description", "tasks.task_number", "tasks.task_name", "tasks.instructions")
    .where("project_id", id)
    .orderBy("tasks.task_number", "asc");
}

function findByTaskId(id) {
  return db("tasks")
    .where({ id })
    .first();
}

function findProjectResources(id) {
  return db("resources")
    .join("projects", "projects.id", "resources.project_id")  
    .select("resources.resource_id", "resources.resource_name", "resources.resource_description")
    .where("project_id", id);
}

function findTasks() {
  return db("tasks");
}

function findResources() {
  return db("resources");
}

function add(project) {
  return db("projects").insert(project, "id");
}

function addTask(task) {
  return db("tasks").insert(task, "id");
}

function addResource(resource) {
  return db("resources").insert(resource, "id");
}

function update(id, changes) {
  return db("projects")
    .where({ id })
    .update(changes);
}

function updateTask(id, changes) {
  return db("tasks")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("projects")
    .where({ id })
    .del();
}

function removeTask(id) {
  return db("tasks")
    .where({ id })
    .del();
}