require('dotenv').config()
const cookieParser = require('cookie-parser')
const {connectDb} = require('./config/connectDb')
const express = require('express')
const { StatusCodes } = require('http-status-codes')
const errorManager = require('./middlewares/errormanager')
const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/thread/user', require('./Routes/user.route'))
app.use('/thread/post', require('./Routes/post.route'))

app.get('*', (req,res)=>{
    res.status(StatusCodes.NOT_FOUND).json("route not found")
})
app.use(errorManager)


const port  = process.env.PORT || 5100
connectDb().then(()=>{
    console.log('database connected successfully')
    app.listen(port, ()=>{
        console.log(`server is running on port ${port}`)
    })
}).catch(err=>console.log(err)) 