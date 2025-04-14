import express, { Router } from 'express'
import mongoose from 'mongoose'
import signupRoutes from './Routes/signup.js'
import loginRoutes from './Routes/login.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './Routes/signup.js'
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(cors())
const app = express()
const port = 3000
mongoose.connect('mongodb://localhost:27017/diary', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => {
    console.log('Connected to MongoDB')
    }).catch(err => {
    console.error('Error connecting to MongoDB', err)
    })
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/signup", signupRoutes)
app.use("/login", loginRoutes) 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})