const Mongoose  = require("mongoose");
require('dotenv').config()
var mongoURL = process.env.MONGO_URL;

Mongoose.connect(mongoURL, {useUnifiedTopology : true , useNewUrlparser : true} );

var db = Mongoose.connection;

db.on('connected', ()=>{
    console.log(`Connection Successfully established`);
    // console.log(Mongoose.connection.db)
})

db.on('error', ()=>{
    console.log(`connection failed`);
})

module.exports = Mongoose;