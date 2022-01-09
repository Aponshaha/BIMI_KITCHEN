const Mongoose  = require("mongoose");

var mongoURL = 'mongodb+srv://Saha:Apon1234566%23@cluster0.lyzsv.mongodb.net/B_Kitchen';

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