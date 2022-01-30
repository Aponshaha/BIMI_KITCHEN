const express = require('express')
require('dotenv').config()
const Food = require('./models/foodModel')

const app = express()

const db = require('./db.js')
app.use(express.json())
app.use(express.static("public"));
const path = require('path')
const port = process.env.PORT ||8000

const foodsRoute = require('./routes/foodsRoute') 
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')

app.use('/api/foods/', foodsRoute)
app.use('/api/users/',userRoute)
app.use('/api/orders/',ordersRoute)

if(process.env.NODE_ENV ==='production')
{
    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'client/build/index.html'))

    })
}

app.listen(port, () => `Server running on port port 🔥`)
