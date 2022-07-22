import axios from "axios";
import React, { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { Modal,Form,Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';



const TakeButton = (items) =>{

    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const [show, setShow] = useState(false);
    const [uname, setName] = useState('')
    const [umail, setEmail] = useState('')
    const [uphone, setPhone] = useState('')
    const [error, setError] = useState(false);
    const [price, setPrice] = useState(0);

    const handleClose = () => {
      setShow(false)
      setError(false)
    };
    const navigate = useNavigate();

    useEffect(() => {
      let price = 0;
      items.items.forEach((item) => {
        price += item.price;
      });
      setPrice(price)
    }, [items]);

    const handleCheckout = () => {
        setShow(true)
    };
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      
    const handleConfirm = () => {
        if(validateEmail(umail) !== null && uname!== '' && uphone!== '')
        {
            axios.post(`/api/orders/takeout`,{
                cartItems : items.items,
                userId:  currentUser._id ? currentUser._id : Math.random().toString(36).substring(2,7),
                name :  uname ,
                email :  umail,
                phone : uphone,
                subtotal:price   
            })
            .then((res)=>{
                if(res.status === 200){
                    navigate("/CheckoutSuccess");
                }
                else{
                    navigate("/CheckoutCancelled");
                }
            })
            .catch((err) => 
            navigate("/CheckoutCancelled")
            )    
        }
        else{
            setError(true)
        }
    };

    return (
        <>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm your order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                autoFocus
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            {error && <Form.Label style={{color:'red'}}>Please provide valid Name,Email and Phone number</Form.Label>}

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
            <button className="m-10 w-100" onClick={()=>handleCheckout()} variant='primary' style={{borderRadius: '50px'}}>
                Takeout
            </button>
        </>
    )
}

export default TakeButton;