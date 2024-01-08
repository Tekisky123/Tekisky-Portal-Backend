import express from "express"
import dottenv from "dotenv"
import bodyParser from "body-parser"
import { dbConnect } from "./db/dbConnect.js"
import studentRouter from "./routers/studentRouter.js"
import userRouter from "./routers/userRouter.js"
import cors from 'cors'

const app=express()
dottenv.config()
let dburl=process.env.DBURL
let dbname=process.env.DBNAME
dbConnect(dburl)
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
const port =process.env.PORT


 app.use("/student",studentRouter)
 app.use("/user",userRouter)
 

app.listen(port,()=>{
    console.log(`server ${port}`)
})
