const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const app = express();
const tasks = require("./routes/tasksRoute");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

// Routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

// Starting Server && Connect to DB
const start = async () => {
   try {
      await connectDB(uri).then(() => console.log("Connected to DB"));
      app.listen(port, () =>
         console.log(`Server listening on http://localhost:${port}...`)
      );
   } catch (error) {
      console.log({
         message: error.message,
      });
   }
};

start();
