const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51Jw3bUJYxHFKrvkMLNqRY6A239LQRhEaAEDVYpbegu861Y2FZ32vTyw1kd21k0Mnm5ZQBuihelHGHjEhxnC8GEO900tsejH7WD")
const Order = require('../models/orderModel')
const sendEmail = require('../services/emailService');


const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1000;
  };

router.post("/placeorder", async(req, res) => {
  const {token , subtotal , currentUser , cartItems} = req.body
  try {
      const customer = await stripe.customers.create({
          email : token.email,
          source:token.id
      })
      const payment = await stripe.charges.create({
          amount:subtotal,
          currency:'jpy',
          customer : customer.id,
          receipt_email : token.email
      }, {
          idempotencyKey : uuidv4()
      })

      if(payment)
      {
          const neworder = new Order({
              name : currentUser.name,
              email : currentUser.email ,
              userid : currentUser._id ,
              orderItems : cartItems , 
              orderAmount : subtotal,
              shippingAddress : {
                  street : token.card.address_line1,
                  city : token.card.address_city,
                  country : token.card.address_country,
                  pincode : token.card.address_zip
              },
              transactionId : payment.source.id
          })

          const options = {
            to: `mailme2apon.saha@gmail.com`,
            from: `"Bimi Kitchen" devapon77@gmail.com`,
            subject: "Order Placed ",
            template: "order-details",
            templateVars: {
              username : neworder.name ? neworder.name : 'abc' ,
              email :  customer.email ,
              subtotal: neworder.orderAmount,
              transactionId: customer.source? customer.source : token.id,
              date: new Date()
            //   userid : currentUser._id ,
            //   orderItems : cartItems , 
            //   orderAmount : subtotal,
            //   shippingAddress : {
            //       street : token.card.address_line1,
            //       city : token.card.address_city,
            //       country : token.card.address_country,
            //       pincode : token.card.address_zip
            //   },
            //   transactionId : payment.source.id
            },
        };
          
          await sendEmail(options);
          await neworder.save();
        
          res.send('Order placed successfully');
      }
      else{
          res.send('Payment failed')
      }

  } catch (error) {
      return res.status(400).json({ message: 'Something went wrong' + error});
  }

});

router.post("/takeout", async(req, res) => {
  const {subtotal , currentUser , cartItems} = req.body
  try {
    const neworder = new Order({
        name : currentUser.name,
        email : currentUser.email ,
        userid : currentUser._id ,
        orderItems : cartItems , 
        orderAmount : subtotal,
        isTakeout: true
    })
    await neworder.save()
    res.send('Order placed successfully')
  } catch (error) {
      return res.status(400).json({ message: 'Something went wrong' + error});
  }

});


router.post("/getuserorders", async(req, res) => {
  const {userid} = req.body
  try {
      const orders = await Order.find({userid : userid}).sort({_id : -1}).limit(5)
      res.send(orders)
  } catch (error) {
      return res.status(400).json({ message: 'Something went wrong' });
  }
});

router.get("/getallorders", async(req, res) => {

     try {
         const orders = await Order.find({}).sort({_id : -1})
         res.send(orders)
     } catch (error) {
         return res.status(400).json({ message: error});
     }

});

router.post("/deliverorder", async(req, res) => {

    const orderid = req.body.orderid
    try {
        const order = await Order.findOne({_id : orderid})
        order.isDelivered = true
        await order.save()
        res.send('Order Delivered Successfully')
    } catch (error) {

        return res.status(400).json({ message: error});
        
    }
  
});


router.post("/create-checkout-sessions", async (req, res) => {
    const items  = req.body;
    var subtotal = items.cartItems.reduce((x, item) =>
        x + item.price, 0
    )
    // console.log(subtotal);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.checkout.sessions.create({
        submit_type: 'donate',
        
        /*
        Collect billing and shipping details
        Use billing_address_collection and shipping_address_collection to collect your customer’s address. 
        shipping_address_collection requires a list of allowed_countries. Checkout displays the list of allowed
        countries in a dropdown on the page.
        */
        line_items: req.body.items,    
        billing_address_collection: 'auto',
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'LV'],
        },
        payment_method_types: [
            'card',
        ],
        mode: 'payment',

        //* Supply success and cancel URLs
        //* Specify URLs for success and cancel pages—make sure they are publicly accessible so Stripe can redirect 
        //* customers to them. You can also handle both the success and canceled states with the same URL.
        success_url: `${YOUR_DOMAIN}/stripe/stripe-success.html`, //! Change
        cancel_url: `${YOUR_DOMAIN}/stripe/stripe-cancel.html`, //! Change
        //* Activate Stripe Tax to monitor your tax obligations, automatically collect tax, and access the reports you need to file returns.
        //* automatic_tax: {enabled: true},
        

    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

module.exports = router

