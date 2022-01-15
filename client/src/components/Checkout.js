import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder, takeOutOrder } from '../actions/orderActions'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'

export default function Checkout({ subtotal }) {

    const orderstate = useSelector((state) => state.placeOrderReducer)
    const { loading, error, success } = orderstate
    const dispatch = useDispatch()
    function tokenHander(token) {
        // console.log(token);
        dispatch(placeOrder(token, subtotal))
    }
    

    return (
        <div>

            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}
            {success && (<Success success='Your Order Placed Successfully' />)}

            <StripeCheckout
                amount={subtotal}
                shippingAddress
                billingAddress={false}
                token={tokenHander}
                stripeKey='pk_test_51Jw3bUJYxHFKrvkMXZwtxtFDjtoVGiD25rUvXmIVCL9he0V0idTeGc6XSNrhOnhSzOt2KLfqagFbpY6IEmdUOk8i00N0cxvf2J'
                currency='JPY'
                shipping_rate='100'
            >
            <button className='btn'>Pay Now</button>
            

            </StripeCheckout>
            <hr/>
            <button className='btn' onClick={()=>{dispatch(takeOutOrder(subtotal))}}>Take Out</button>

        </div>
    )
}