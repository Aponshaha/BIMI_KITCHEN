import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
export default function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch()
  console.log(currentUser);
  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg bg-white rounded">
        <a className="navbar-brand font-weight-bold" style={{marginLeft: '2%'}} href="/">
          BIMI KITCHEN
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"><i style={{color:'black'}} className="fas fa-bars"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto mr-2">
            {currentUser && currentUser.name ? (
              <div className="dropdown m-2">
              <a style={{color:'black'}} className="dropdown-toggle font-weight-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currentUser.name}
              </a>
              <div style={{color:'black' }}  className="dropdown-menu font-weight-bold" aria-labelledby="dropdownMenuButton">
                <a  style={{color:'black', textDecoration:'none' }} className="dropdown-item font-weight-bold" href="/orders">Orders</a>
                <a style={{color:'black', textDecoration:'none' }} className="dropdown-item font-weight-bold" href="#" onClick={()=>{dispatch(logoutUser())}}><li>Logout</li></a>
              </div>
            </div>
            ) : (
              <li className="nav-item">
                <a className="nav-link font-weight-bold" href="/login">
                  Login
                </a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link font-weight-bold" href="/cart">
                Cart {cartstate.cartItems.length}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}