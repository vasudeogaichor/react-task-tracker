// tasksAPI.js

const API_URL = 'http://localhost:5000/tasks';

// Fetch all tasks
export const fetchTasks = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
};

// Fetch a single task
export const fetchTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  return data;
};

// Add a task
export const addTask = async (task) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await res.json();
  return data;
};

// Delete a task
export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.status === 200;
};

// Toggle task reminder
export const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id);
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask),
  });

  const data = await res.json();
  return data.reminder;
};
