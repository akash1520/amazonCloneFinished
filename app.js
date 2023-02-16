require("dotenv").config()
const express = require("express")
const app = express()
require("./db/conn.js")
const cors = require("cors")
const DefaultData= require("./DefaultData")
const router = require("./routes/router.js")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cors())
app.use(cookieParser(""))
app.use(router)


const port = process.env.PORT||8005;
app.listen(port,()=>{
    console.log(`server is running on port number ${port}`)
})

DefaultData()