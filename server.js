import { Server } from "socket.io";

const port = 3001;

const io = new Server(port, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let tasks = [];

// Helper function to sort tasks: incomplete tasks first, completed tasks after
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

console.log(`WebSocket server is running on port ${port}`);