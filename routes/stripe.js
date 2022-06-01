const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51Jw3bUJYxHFKrvkMLNqRY6A239LQRhEaAEDVYpbegu861Y2FZ32vTyw1kd21k0Mnm5ZQBuihelHGHjEhxnC8GEO900tsejH7WD')

router.get('/Checkout_success', async (req, res) => {
  // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);
  const session = await stripe.checkout.sessions.retrieve(
    'cs_test_a1oix6w00sXpMExlUxWIB3X8o54a2dc2jnJo7vDZKzhr5EQKeEJx2hus5z'
  );
  res.json(session);
  // console.log('customer.name');
  // res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
});

router.post('/create-checkout-session', async (req, res) => {
  const line_items = req.body.items.items.map((item) => {
    return {
      price_data: {
        currency: "jpy",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    // payment_method_types: ["card"],
    // shipping_address_collection: {
    //   allowed_countries: ["JP"],
    // },
    // phone_number_collection: {
    //   enabled: true,
    // },
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/Checkout_success?session_id={CHECKOUT_SESSION_ID}',
    // success_url: "http://localhost:3000/CheckoutSuccess?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: 'http://localhost:3000/#',
  });
  
  // res.json(session)
  res.send({url: session.url});

});

module.exports = router