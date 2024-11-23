const express = require("express");
const router = express.Router();

let users = [];

router.post("/", (req, res) => {
  const { username, email, user } = req.body;

  users.push({
    id: users.length,
    username: username,
    email: email,
    user: user
  });
  res.status(201).json({ message: "user is added" });
});

router.get("/", (req, res) => {
  res.json(users);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, user } = req.body;

  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index !== -1) {
    users[index] = { ...users[index], username, email, user };
    res.json({ message: "user is updated" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: "user is deleted" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

module.exports = router;
