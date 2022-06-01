const mongoose = require("mongoose");
const orderSchema= mongoose.Schema({
    customerId : {type:String , require},
    name : {type: String , require},
    email: {type: String , require},
    phone: {type: String , default: false},
    userid : {type: String , require},
    orderItems : [],
    shippingAddress : {type:Object},
    orderAmount : {type:Number , require},
    total : {type:Number , require},
    isDelivered : {type:Boolean , require , default: false},
    isTakeout : {type:Boolean , default: false},
    paymentIntentId : {type:String , require},
    payment_status : {type:String , require},
    
},{
    timestamps : true
})

module.exports = mongoose.model('orders' , orderSchema)