import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Cors from 'cors'
import pinRoute from './routes/pins.js'
import userRoute from './routes/users.js'

const app = express()
dotenv.config()
app.use(express.json())
app.use(Cors())
mongoose.connect(process.env.MONGO_URL , {})
.then(()=> {
     console.log("MMOngoose connected")
});

app.use("/api/pins", pinRoute)
app.use("/api/users", userRoute)

app.listen(8800,()=>{
     console.log("Backend is  running")
})

