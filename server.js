const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = 5000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes for handling CRUD operations
server.get('/tasks', (req, res) => {
  const tasks = router.db.getState().tasks || [];
  res.jsonp(tasks);
});

server.post('/tasks', (req, res) => {
  const task = req.body;
  const tasks = router.db.getState().tasks || [];
  console.log('tasks -', tasks)
  task.id = tasks.length + 1; // Auto-increment the ID
  console.log('task -', task)
  router.db.assign({ tasks: [...tasks, task] }).write();
  res.jsonp(task);
});

server.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  router.db
    .get('tasks')
    .find({ id: parseInt(id) })
    .assign(updatedTask)
    .write();
  res.jsonp(updatedTask);
});

server.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  router.db.get('tasks').remove({ id: parseInt(id) }).write();
  res.status(204).jsonp({});
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
