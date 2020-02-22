const Projects = require('../routers/router-model');

function validateProjectId(req, res, next) {
  Projects.findById(req.params.id)
    .then(project => {
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Invalid project id" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retreiving the project",
      });
    });
}

function validateProject(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!req.body.project_name) {
    res.status(400).json({ message: "Missing required name field" });
  } else if (!req.body.project_description) {
    res.status(400).json({ message: "Missing required description field" });
  } else if (!req.body.completed) {
    req.body = {...req.body, completed: 0}
    next();
  }else {
    next()
  }
}

function validateTask(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!req.body.instructions) {
    res.status(400).json({ message: "Missing required description field" });
  } else if (!req.body.task_name) {
    res.status(400).json({ message: "Missing required name field" });
  } else if (!req.body.completed) {
    req.body = {...req.body, completed: "false"}
    next();
  } else {
    next()
  }
}

function validateTaskId(req, res, next) {
  Projects.findByTaskId(req.params.id)
  .then(task => {
    if(task) {
      req.task = task;
      next();
    } else {
      res.status(400).json({ message: "Invalid action id" })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error retreiving the action",
    });
  });
}

module.exports = { validateTask, validateTaskId, validateProject, validateProjectId };
