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
import TakeButton from '../components/TakeButton';




import AOS from 'aos';
import 'aos/dist/aos.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Cartscreen() {
    AOS.init();
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;
    const dispatch = useDispatch();
    return (
        <Container className='mt-5 mb-5'>
        <Row>
          <Col>
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
          </Col>
          <Col>
          {cartItems.length > 0 &&
                <div>
                    <PayButton items={cartItems} />
                    <br />
                    <TakeButton items={cartItems} />
                </div>
          }
          </Col>
        </Row>
      </Container>
    );
}


