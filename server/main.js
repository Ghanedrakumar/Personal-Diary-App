import express, { Router } from 'express'
import mongoose from 'mongoose'
import signupRoutes from './Routes/signup.js'
import loginRoutes from './Routes/login.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './Routes/signup.js'
import ModalRoutes from './Routes/Modal.js'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
router.use(bodyParser.json())
dotenv.config(); 
router.use(bodyParser.urlencoded({ extended: true }))
// router.use(cors())

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
app.use(cors({
  origin: "http://localhost:5174", // or your frontend URL
  credentials: true,
}));

app.use(cookieParser())
app.use("/signup", signupRoutes)
app.use("/login", loginRoutes) 
app.use("/modal", ModalRoutes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Error handling
app.use((err,req,res,next)=>{
  const statusCode =err.statusCode || 500
  const message =err.message || "Internel Server Error"
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  })
  })