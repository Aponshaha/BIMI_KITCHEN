import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  deliverOrder, getAllOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import { Modal,Button,Toast,Row,Col } from "react-bootstrap";
import { Pagination } from 'react-bootstrap';  
import '../../src/App.css'

export default function Orderslist() {
  const dispatch = useDispatch();
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);
  const { loading, error, orders,currentPage,numberOfPages } = getordersstate;
  const [orderDetails, setOrderDetails] = useState(orders ? orders[0] : null);
  const [show, setShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  console.log('handleDetails',orders,currentPage,numberOfPages)
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const handleClose = () => setShow(false);
  const [toastShow, setToastShow] = useState(false);
  useEffect(() => {
    dispatch(getAllOrders(pageNumber));// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);
  const handleDetails = (order) => {
    setShow(true)
    setOrderDetails(order)
};
const handleDeliver = async(orderid) => {
  const response = await axios.post('/api/orders/deliverorder', { orderid })
  console.log(response);
  if(response.status=== 200){
    dispatch(getAllOrders(pageNumber));
    setToastShow(true)
  }
};
const changePage = (number) => {
  console.log('changePage',number)
  setPageNumber(number)
  //setPageNumber(Math.max(0, pageNumber - 1));
};
const gotoPrevious = () => {
  setPageNumber(Math.max(0, pageNumber - 1));
};

const gotoNext = () => {
  setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
};
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <Row>
      <Col xs={6}>
      </Col>
      <Col xs={6}>
        <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Delevered</strong>
          </Toast.Header>
          <Toast.Body>This Item is Delivered</Toast.Body>
        </Toast>
      </Col>
    </Row>
      <table className="table table-striped table-bordered p-3 table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Order</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td onClick={()=>handleDetails(order)}>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.name}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.isTakeout ? (
                      <h1>Take Out</h1>
                    ) : (
                      <h1>Delivery</h1>
                    )}</td>
                  <td>
                    {order.isDelivered ? (
                      <h1>Delivered</h1>
                    ) : (
                      // <button className="btn" style={{width:'100%',height:'70%'}} onClick={()=>{dispatch(deliverOrder(order._id))}}>Deliver</button>
                      <button className="btn" style={{width:'100%',height:'70%'}} onClick={()=>handleDeliver(order._id)}>Deliver</button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='container p-2'>  
   <Pagination size="lg">  
     {pages.map((pageIndex) => (
       <Pagination.Item active={pageNumber === Number(pageIndex+1)} key={pageIndex} onClick={() => changePage(Number(pageIndex+1))}>{pageIndex + 1}</Pagination.Item>  
      ))}
   </Pagination>  
   </div>  


      {orderDetails && 
 <Modal show={show} onHide={handleClose}>
 <Modal.Header closeButton>
   <Modal.Title>Delivery Details</Modal.Title>
 </Modal.Header>
 <Modal.Body>
   <h4>Items</h4>
   <>
   {orderDetails?.orderItems.length > 0 ? 
   orderDetails?.orderItems.map(item => {
    return <div>
       <p>{item.name} [{item.varient}] * {item.quantity} = {item.price}</p>
      </div>
   }): ''}
    </>
</Modal.Body>
 <Modal.Footer>
   <Button variant="secondary" onClick={handleClose}>
     Close
   </Button>
   <Button variant="primary" onClick={handleClose}>
     Deliver
   </Button>
 </Modal.Footer>
</Modal>
      }
    </div>
  );
}