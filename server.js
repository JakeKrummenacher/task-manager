import { Server } from "socket.io";
import express from 'express'
import http from 'http'

const app = express()
app.set('trust proxy', 1)
const server = http.createServer(app)
const port = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  allowEIO3: true
});

let tasks = [];

const sortTasks = (tasks) => {
  return tasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("tasks", sortTasks(tasks));

  socket.on("addTask", (task) => {
    tasks.push(task);
    io.emit("tasks", sortTasks(tasks)); 
  });

  socket.on("completeTask", (taskId) => {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    io.emit("tasks", sortTasks(tasks));
  });

  socket.on("uncompleteTask", (taskId) => {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: false } : task
    );
    io.emit("tasks", sortTasks(tasks));
  });

  socket.on("deleteTask", (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    io.emit("tasks", sortTasks(tasks));
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`WebSocket Server is running on port ${port}`)
})