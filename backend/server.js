const express = require('express');
require("dotenv").config();
const authMiddleware = require('./authMiddleware');
const userRouter = require('./routes/auth');
const connectToDB = require('./config/db');
const taskRouter = require('./routes/taskRoutes');


const app = express();
const port = 3004;
const MONGODB_URI = "mongodb+srv://rashi:rashi@cluster0.kvlukpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


app.use(express.json());


app.get("/", (req, res) => {
    res.send("this is a home route");
  });


// Routes
app.use('/api', userRouter);
app.use('/api/tasks', authMiddleware, taskRouter );


app.listen(port, async () => {
    try {
      await connectToDB(MONGODB_URI);
      console.log("connect to database");
      console.log(`server is running at ${port}`);
    } catch (err) {
      console.log(err);
    }
  });
