'use client'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Task } from "../types";

const socket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001");

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>("");

  useEffect(() => {
    socket.on("tasks", (updatedTasks: Task[]) => {
      setTasks(updatedTasks);
    });

    return () => {
      socket.off("tasks");
    };
  }, []);

  const addTask = () => {
    if (newTaskName.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTaskName,
        completed: false,
      };
      socket.emit("addTask", task);
      setNewTaskName("");
    }
  };

  const handleTaskCompletion = (task: Task) => {
    if (task.completed) {
        socket.emit('uncompleteTask', task.id)
    } else {
        socket.emit('completeTask', task.id)
    }
  };

  const deleteTask = (taskId: string) => {
    socket.emit("deleteTask", taskId);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="flex-1 p-2 border rounded-l text-black"
          placeholder="Add a new task"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between mb-2">
            <span
              className={`flex-1 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleTaskCompletion(task)}
              className="ml-2 p-1 bg-green-500 text-white rounded"
            >
                {task.completed ? <span>Mark as Incomplete</span> : <span>Complete</span>}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-2 p-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
