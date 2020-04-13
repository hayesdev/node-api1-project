const express = require("express");
const db = require("./database.js");
const shortid = require("shortid");

const server = express();

server.get("/", (req, res) => {
  res.json({ message: "hello, world!" });
});

server.get("/api/users", (req, res) => {
  const users = db.getUsers();
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = db.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
});

// server.post("/api/users", (req, res) => {
//   if (!req.body.name) {
//     return res.status(400).json({
//       message: "Need a user name",
//     });
//   }
//   // if (!req.body.id) {
//   //   return res.status(400).json({
//   //     message: "Missing a user Id",
//   //   });
//   // }

//   const newUser = db.createUser({
//     // id: shortid,
//     name: req.body.name,
//     // bio: "A new user",
//   });
//   res.status(201).json(newUser);
// });

server.delete("/api/users/:id", (req, res) => {
  // checking to see if user exists
  const user = db.getUserById(req.params.id);
  if (user) {
    db.deleteUser(user.id);

    // can also use status(204) for a success with no feedback / "No Content"
    return res.status(204).json({
      message: "User successfully removed",
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

server.listen(3000, () => {
  console.log("server started on port 3000");
});
