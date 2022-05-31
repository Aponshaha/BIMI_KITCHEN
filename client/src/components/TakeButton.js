import axios from "axios";
import React, { useState } from "react";
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

    const handleClose = () => setShow(false);
    const navigate = useNavigate();
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
        if(validateEmail(umail) !== null)
        {
            console.log('TakeButton email',validateEmail(umail))
            axios.post(`/api/orders/takeout`,{
                cartItems : items,
                userId:  currentUser._id ? currentUser._id : Math.random().toString(36).substring(2,7),
                name : userstate.name ? userstate.name : uname ,
                email : userstate.email ? userstate.email : umail,
                phone : uphone    
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
        <Modal.Header closeButton>
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
             {error && <Form.Label style={{color:'red'}}>Please enter valid Email</Form.Label>}
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
            <button onClick={()=>handleCheckout()}>
                Takeout
            </button>
        </>
    )
}

export default TakeButton;