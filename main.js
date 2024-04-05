const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const booksRoutes = require("./routes/books");
const usersRoutes = require("./routes/users");
const blogsRoutes = require("./routes/blogs");
const loginRoutes = require("./routes/login")
const connectToDataBase = require("./db");
const cors= require("cors")

const PORT = 3030;
const app = express();

app.use(cors())
app.use(express.json());

// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/", booksRoutes);
app.use("/", usersRoutes);
app.use("/", blogsRoutes);
app.use("/", loginRoutes);

connectToDataBase();

app.listen(PORT, () =>
  console.log(`Server connected and listening on port ${PORT}`)
);
