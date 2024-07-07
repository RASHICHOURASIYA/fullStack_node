const express = require('express');
require("dotenv").config();
const authMiddleware = require('./authMiddleware');
const taskRoutes = require('./task');
const userRouter = require('./auth');
const connectToDB = require('./config/db');


const app = express();
const port = 3003;
const MONGODB_URI = "mongodb+srv://rashi:rashi@cluster0.kvlukpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


app.use(express.json());


app.get("/", (req, res) => {
    res.send("this is a home route");
  });


// Routes
app.use('/api', userRouter);
app.use('/api/tasks', authMiddleware, taskRoutes);


app.listen(port, async () => {
    try {
      await connectToDB(MONGODB_URI);
      console.log("connect to database");
      console.log(`server is running at ${port}`);
    } catch (err) {
      console.log(err);
    }
  });
