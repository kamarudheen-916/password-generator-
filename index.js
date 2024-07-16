const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./Config/db')
const cors = require('cors');
const userRouter = require('./Routes/userRoutes')
const app = express()
dotenv.config()
connectDB()
const PORT = 4000

app.use(cors({origin:process.env.CORS_ORIGN}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',userRouter)

app.listen(PORT,()=>console.log(`The port is running on http://localhost:${PORT}`))