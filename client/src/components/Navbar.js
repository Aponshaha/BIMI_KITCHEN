import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
export default function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch()
  console.log(currentUser);
  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg bg-white rounded">
        <a className="navbar-brand font-weight-bold" style={{ marginLeft: '2%' }} href="/">
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
          <span className="navbar-toggler-icon"><i style={{ color: 'black' }} className="fas fa-bars"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto mr-2">
            <li className="dropdown m-2">
              <a className="nav-link m-2" href="/#">
                <LocalPhoneIcon />  03-6231-8440
              </a>
            </li>
            <li className="dropdown m-2">
              <a className="nav-link  m-2" href="/#">
                About
              </a>
            </li>
            <li className="dropdown m-2">
              <a className="nav-link  m-2 " href="/cart">
                Cart {cartstate.cartItems.length}
              </a>
            </li>
            {currentUser && currentUser.name ? (
              <div className="dropdown " style={{ background: '#fff', borderRadius: '50px' }}>
                <a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-toggle m-4 " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {currentUser.name}
                </a>
                {currentUser.isAdmin === true ? (
                  <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                  <a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item " href="/orders">Orders</a>
                  <a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item " href="/admin"><li>ADMIN</li></a>
                  <a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item " href="#" onClick={() => { dispatch(logoutUser()) }}><li>Logout</li></a>
                </div>
                ):(
                  <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                  <a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item " href="/orders">Orders</a>
                  <a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item " href="#" onClick={() => { dispatch(logoutUser()) }}><li>Logout</li></a>
                </div>
                )}
                {/* <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                  <a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item " href="/orders">Orders</a>
                  <a style={{ color: 'black', textDecoration: 'none' }} className="dropdown-item " href="#" onClick={() => { dispatch(logoutUser()) }}><li>Logout</li></a>
                </div> */}
              </div>
            ) : (
              <li className="dropdown m-2">
                <a className="nav-link m-2" href="/login">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}