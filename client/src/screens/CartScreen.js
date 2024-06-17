import { React, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from '../actions/cartActions';
import { deleteFromCart } from '../actions/cartActions'
import PayButton from '../components/PayButton';
import TakeButton from '../components/TakeButton';
import CashOnDelivery from '../components/CashOnDelivery';
import { isMobile } from 'react-device-detect';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function Cartscreen() {
    AOS.init();
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;
    const dispatch = useDispatch();
    const radios = [
        { name: 'Normal', value: '1' },
        { name: 'Spicy', value: '2' },
        { name: 'Extra Spicy', value: '3' },
    ];

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    return (

        <div>
            <div className="row justify-content-center p-2 " data-aos='fade-down'>
                <div className="col-md-1">
                </div>

                <div className="col-md-7">
                    {cartItems.length > 0 ?
                        <>
                            <h2 className="ml-3" style={{ fontSize: '32px' }}>Your Products - {cartstate.cartItems.length} Items</h2>
                            {cartItems.map(item => {
                                return <div style={{ padding: '15px', margin: '10px' }} className="flex-container shadow-lg bg-white rounded">
                                    <div className='text-left m-10 w-100'>
                                        <h1 >{item.name} [{item.varient}]</h1>
                                        <h1 > Price: {item.quantity} * {item.prices[0][item.varient]} = {item.price} </h1>
                                        <h1 style={{ display: 'inline-block' }}>Quantity: </h1>
                                        <i className="fa fa-plus" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity + 1, item.varient)) }}> </i>
                                        <b>{item.quantity}</b>
                                        <i className="fa fa-minus" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity - 1, item.varient)) }}></i>

                                    </div>
                                    <div className={isMobile ? "m-10 w-100" : "m-10 w-50"}>
                                        <img src={item.image} style={{ height: '80px', width: '80px' }} />
                                        <i className="fa fa-trash ml-5" aria-hidden="true" onClick={() => { dispatch(deleteFromCart(item)) }}></i>

                                    </div>

                                </div>
                            })
                            }

                            <ButtonGroup className="mb-2" style={{ margin: '10px', fontSize: '20px' }}>
                                {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        variant="secondary"
                                        name="radio"
                                        value={radio.value}
                                        checked={radioValue === radio.value}
                                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                            <br />
                            <a style={{ margin: '10px', fontSize: '20px' }} href="/" class="btn btn-primary">Back to shopping</a>
                        </>
                        :
                        <>
                            <div style={{ padding: isMobile ? '40px' : '100px' }} class="col-sm-12 empty-cart-cls text-center">
                                <img alt={'Empty Cart'} src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" width="160" height="160" class="img-fluid mb-4 mr-3" />
                                <h3><strong>Your Cart is Empty</strong></h3>
                                <h4>Add something to make me happy :)</h4>
                                <a href="/" class="btn btn-primary">continue shopping</a>

                            </div>
                        </>
                    }
                </div>
                {cartItems.length > 0 &&
                    <div style={{ paddingTop: isMobile ? '0px' : '55px' }} className="col-md-3">
                        <PayButton items={cartItems} />
                        <br />
                        <TakeButton items={cartItems} />
                        <br />
                        <CashOnDelivery items={cartItems} />
                    </div>

                }
                <div className="col-md-1">
                </div>

            </div>

        </div>
    );
}