import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express'
import apiRouter from './routes/index.js'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express()
app.use(
  cors({
  origin:"http://localhost:5173",
  credentials: true,
  })


);
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 4001

connectDB()
console.log('Server is about to start'); 

app.get('/', (req, res) => {
  res.send('Hello World !!!')
})


app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})