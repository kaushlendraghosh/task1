import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/taskAPI';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', priority: 'low' });

  const getTasks = async () => {
    const { data } = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(form);
    setForm({ title: '', description: '', priority: 'low' });
    getTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    getTasks();
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} - {task.priority}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
