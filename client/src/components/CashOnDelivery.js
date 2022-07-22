import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CashOnDelivery = (items) => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [show, setShow] = useState(false);
  const [uname, setName] = useState("");
  const [umail, setEmail] = useState("");
  const [uphone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [price, setPrice] = useState(0);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [building, setBuilding] = useState("");

  const handleClose = () => {
    setShow(false);
    setError(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    items.items.forEach((item) => {
      price += item.price;
    });
    setPrice(price);
  }, [items]);


  const handleCheckout = () => {
    setShow(true);
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleConfirm = () => {
    if (validateEmail(umail) !== null && uname !== "" && uphone !== "" && address1 !== "" && building !== "" && zipCode.length === 9) {
      axios
        .post(`/api/orders/cashondelivery`, {
          cartItems: items.items,
          userId: currentUser._id
            ? currentUser._id
            : Math.random().toString(36).substring(2, 7),
          name: uname,
          email: umail,
          phone: uphone,
          subtotal: price,
          address:address1+', '+address2,
          zipCode,
          building
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/CheckoutSuccess");
          } else {
            navigate("/CheckoutCancelled");
          }
        })
        .catch((err) => navigate("/CheckoutCancelled"));
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header style={{padding:'0px'}}>
          <Modal.Title>Confirm your order</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:'0px'}}> 
          <Form style={{paddingTop:'0px'}}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label style={{marginBottom:'0px'}}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{marginBottom:'0px'}}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{marginBottom:'0px'}}>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                autoFocus
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{marginBottom:'0px'}}>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address 1"
                autoFocus
                onChange={(e) => setAddress1(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Address 2"
                autoFocus
                onChange={(e) => setAddress2(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Zip Code"
                autoFocus
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Building Number"
                autoFocus
                onChange={(e) => setBuilding(e.target.value)}
              />
            </Form.Group>
            {error && (
              <Form.Label style={{ color: "red" }}>
                Please provide valid Name,Email, Phone number and Address
              </Form.Label>
            )}
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
      <button
        className="m-10 w-100"
        onClick={() => handleCheckout()}
        variant="primary"
        style={{ borderRadius: "50px" }}
      >
        Cash On Delivery
      </button>
    </>
  );
};

export default CashOnDelivery;
