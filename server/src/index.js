const express = require('express');
const cors = require("cors");
const userRoutes = require("./api/users");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.patch("/api/users/:id", (req, res) => {
  res.status(405).json({ message: "Use the appropriate /api/users PATCH route for updates." });
});

app.delete("/api/users/:id", (req, res) => {
  res.status(405).json({ message: "Use the appropriate /api/users DELETE route for deletion." });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
