// App.js

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';
import { fetchTasks, addTask, deleteTask, toggleReminder } from './tasksAPI';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const handleAddTask = async (task) => {
    const newTask = await addTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (id) => {
    const isSuccess = await deleteTask(id);
    isSuccess && setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleReminder = async (id) => {
    const isReminderSet = await toggleReminder(id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: isReminderSet } : task
      )
    );
  };

  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={handleAddTask} />}
                {tasks.length ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleReminder}
                  />
                ) : (
                  'No tasks to show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
