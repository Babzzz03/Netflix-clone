const express = require('express');
const cors = require('cors');

const connectDB = require("./db/connect");
require("dotenv").config();
const userRoutes = require('./routes/UserRoutes')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes)


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();