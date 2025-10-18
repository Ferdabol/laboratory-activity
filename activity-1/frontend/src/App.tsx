import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

const API_URL = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;
    try {
      const res = await axios.post(API_URL, { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}/toggle`);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };


  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  const completedCount = tasks.filter((t) => t.completed).length;
  const uncompletedCount = tasks.length - completedCount;

  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen text-white">
      <fieldset className="border-purple-500 border-2 rounded-lg p-6">
        <h1 className="text-3xl text-center mb-4">To-Do List</h1>

        <div className="flex space-x-2 justify-center mb-6">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
            className="border-2 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-violet-500 to-purple-400 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            Add Task
          </button>
        </div>

        <p className="text-center text-2xl mb-2">Task List</p>
        <ol className="p-0">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center mt-3 mb-3 border-2 p-2 rounded-lg hover:-translate-y-1 transition-all"
            >
              <input
                type="checkbox"
                className="mr-3 scale-125 cursor-pointer"
                onChange={() => toggleTaskCompletion(task._id)}
                checked={task.completed}
              />
              <span
                className={`text-lg flex-1 ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
              <button
                className="text-red-400 hover:scale-110 transition-transform"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>

        <hr className="my-4 border-gray-600" />


        <div className="text-center">
          <p className="text-lg">
            Completed: {completedCount} / Uncompleted: {uncompletedCount}
          </p>
        </div>
      </fieldset>
    </div>
  );
}

export default App;
