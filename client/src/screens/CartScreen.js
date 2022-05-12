import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Box from '@mui/material/Box';
import { addToCart } from '../actions/cartActions';
import { deleteFromCart } from '../actions/cartActions'
import Checkout from '../components/Checkout';
import Takeout from '../components/Takeout';
import PayButton from '../components/PayButton';



import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Cartscreen() {
    AOS.init();
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;
    var subtotal = cartItems.reduce((x, item) =>
        x + item.price, 0
    )
    const dispatch = useDispatch();
    return (
        
        <div>
            <div className="row justify-content-center p-2 " data-aos='fade-down'>
                <div className="col-md-6">
                    <h2 style={{ fontSize: '40px' }}>My Cart</h2>
                    {cartItems.map(item => {
                        return <div className="flex-container">
                            <div className='text-left m-10 w-100'>
                                <h1 >{item.name} [{item.varient}]</h1>
                                <h1 > Price: {item.quantity} * {item.prices[0][item.varient]} = {item.price} </h1>
                                <h1 style={{ display: 'inline-block' }}>Quantity: </h1>
                                <i className="fa fa-plus" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity + 1, item.varient)) }}> </i>
                                <b>{item.quantity}</b>
                                <i className="fa fa-minus" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity - 1, item.varient)) }}></i>
                                <hr />
                            </div>
                            <div className="m-10 w-100">
                                <img src={item.image} style={{ height: '80px', width: '80px' }} />
                                <i className="fa fa-trash ml-5" aria-hidden="true" onClick={() => { dispatch(deleteFromCart(item)) }}></i>
                            </div>
                            <div></div>
                        </div>
                    })
                    }
                </div>

                {/* <div className="col-md-4 text-left tabs font-size-small ">
                    <Tabs
                        defaultActiveKey="takeout"
                        id="noanim-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="takeout" title="Take Out">
                            <Takeout subtotal={subtotal} />
                            
                        </Tab>
                        <Tab eventKey="profile" title="Delivery">
                            <Checkout subtotal={subtotal} />
                        </Tab>
                    </Tabs>
                </div> */}
                <PayButton items = {cartItems}/>
            </div>
            
        </div>
    );
}


