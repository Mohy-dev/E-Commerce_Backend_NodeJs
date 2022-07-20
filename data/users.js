const bcrypt = require("bcrypt");

const Users = [
  {
    name: "John Doe",
    email: "admin@email.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "justa@emailcom",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "Jack Doe",
    email: "another@email.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "Jill Doe",
    email: "user@email.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: false,
  },
];

module.exports = Users;
