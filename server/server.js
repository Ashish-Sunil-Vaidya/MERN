require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const MONGO_URI = "mongodb://localhost:27017/";
const PORT = 3000

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to db & listening on port',PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })