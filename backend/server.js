const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Creating express server
const app = express();
const port = process.env.PORT || 5000;

// Parse json
app.use(cors());
app.use(express.json());

// DB config
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');

app.use('/projects', projectsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});