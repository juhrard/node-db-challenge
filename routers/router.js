const express = require('express');
const { validateTask, validateTaskId, validateProject, validateProjectId } = require('../middleware');
const projects = require('./router-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  projects.find()
  .then(projects => {
    console.log(projects);
    const newProjects = projects.map(project => {
      if(project.completed === 0) {
        project.completed = false;
      } else {
        project.completed = true;
      }
      return project;
    });
    res.json(newProjects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.get('/tasks', (req, res) => {
  projects.findTasks()
  .then(tasks => {
    const newTasks = tasks.map(task => {
      if(task.completed === 0) {
        task.completed = false;
      } else {
        task.completed = true;
      }
      return task;
    });
    res.json(newTasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.get('/resources', (req, res) => {
  projects.findResources()
  .then(resources => {
    res.json(resources);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.get('/:id', validateProjectId, (req, res) => {
  const { id } = req.params;

  projects.findById(id)
  .then(project => {
    if (project) {
      if(project.completed === 0) {
        project.completed = false;
        res.json(project);
      } else {
        project.completed = true;
        res.json(project);
      }
      return project;
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.get('/:id/tasks', validateProjectId, (req, res) => {
  const { id } = req.params;

  projects.findProjectTasks(id)
  .then(tasks => {
    if (tasks.length) {
      const newTasks = projects.map(task => {
        if(task.completed === 0) {
          task.completed = false;
        } else {
          task.completed = true;
        }
        return project;
      });
      res.json(newProjects);
      res.json(tasks);
    } else {
      res.status(404).json({ message: 'Could not find tasks for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.get('/:id/resources', validateProjectId, (req, res) => {
  const { id } = req.params;
  projects.findProjectResources(id)
  .then(resources => {
    if (resources.length) {
      res.json(resources);
    } else {
      res.status(404).json({ message: 'Could not find resources for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});

router.post('/', validateProject, (req, res) => {
  const projectData = req.body;

  projects.add(projectData)
  .then(project => {
    res.status(201).json(req.body);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

router.post('/:id/tasks', validateTask, validateProjectId, validateTaskId, (req, res) => {
  const { id } = req.params; 
  const taskData = {...req.body, project_id: id};
  
  projects.addTask(taskData)
  .then(task => {
    res.status(201).json(task);
  })
});

router.post('/:id/resources', validateProjectId, (req, res) => {
  const { id } = req.params; 
  const resourceData = {...req.body, project_id: id};
  
  projects.addResource(resourceData)
  .then(resource => {
    res.status(201).json(resource);
  })
});

router.put('/:id', validateProjectId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  projects.update(id, changes)
  .then(updatedproject => {
    res.json(updatedproject);
  });
});

router.put('/:id/tasks', validateTask, validateProjectId, validateTaskId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  projects.updateTask(id, changes)
  .then(updatedproject => {
    res.json(updatedproject);
  });
});

router.delete('/:id', validateProjectId, (req, res) => {
  const { id } = req.params;

  projects.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: id });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project' });
  });
});

router.delete('/:id/tasks/:taskId', validateProjectId, validateTaskId, (req, res) => {
  const { taskId } = req.params;

  projects.remove(taskId)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: taskId });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project' });
  });
});

module.exports = router;