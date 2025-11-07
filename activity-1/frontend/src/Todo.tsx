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
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");

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

  const startEditing = (task: Task) => {
    setEditingTaskId(task._id);
    setEditedTitle(task.title);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTitle("");
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, { title: editedTitle });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      cancelEditing();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const uncompletedCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-700 p-4 sm:p-6">
      <div className="w-full max-w-lg bg-gray-900 text-white rounded-2xl shadow-2xl p-4 sm:p-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">✨ To-Do List</h1>

        <div className="flex flex-col sm:flex-row mb-4 sm:mb-6 space-y-2 sm:space-y-0 sm:space-x-2">
          <input 
            type="text" 
            placeholder="Add a new task..." 
            value={newTask} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="flex-1 border-2 border-purple-500 rounded-lg px-3 py-2 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400" 
          />
          <button 
            onClick={addTask} 
            className="bg-gradient-to-r from-violet-500 to-purple-400 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform whitespace-nowrap"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <p className="text-lg sm:text-xl font-semibold mb-3 text-center">Your Tasks</p>
        <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800 pr-2">
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li 
                key={task._id} 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-800 rounded-lg p-3 shadow hover:-translate-y-1 hover:shadow-lg transition-all gap-3"
              >
                <div className="flex items-start sm:items-center flex-1 space-x-3 min-w-0 overflow-hidden">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTaskCompletion(task._id)} 
                    className="h-5 w-5 mt-1 sm:mt-0 cursor-pointer accent-purple-500 flex-shrink-0" 
                  />
                  {editingTaskId === task._id ? (
                    <textarea
                      value={editedTitle} 
                      onChange={(e) => setEditedTitle(e.target.value)} 
                      className="flex-1 bg-gray-700 rounded px-2 py-1 text-white focus:outline-none resize-none min-h-[40px] w-full"
                      rows={2}
                    />
                  ) : (
                    <span 
                      className={`text-base sm:text-lg flex-1 break-words overflow-wrap-anywhere ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  )}
                </div>

                <div className="flex space-x-3 justify-end sm:justify-start flex-shrink-0">
                  {editingTaskId === task._id ? (
                    <>
                      <button 
                        onClick={() => saveEdit(task._id)} 
                        className="text-green-400 hover:scale-110 transition-transform text-sm sm:text-base whitespace-nowrap"
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEditing} 
                        className="text-gray-400 hover:scale-110 transition-transform text-sm sm:text-base whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => startEditing(task)} 
                        className="text-blue-400 hover:scale-110 transition-transform text-sm sm:text-base whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteTask(task._id)} 
                        className="text-red-400 hover:scale-110 transition-transform text-sm sm:text-base whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-4 sm:my-6 border-gray-700" />

        <div className="text-center text-base sm:text-lg">
          <p className="break-words">
            ✅ Completed: <span className="text-green-400">{completedCount}</span> | ⏳ Uncompleted: <span className="text-yellow-400">{uncompletedCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
