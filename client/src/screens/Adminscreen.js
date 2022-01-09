

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import Orderslist from "./Orderslist";
import Userslist from "./Userslist";
import Foodslist from "./Foodslist";
import Addfood from "./Addfood";
import Editfood from "./Editfood";


export default function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center p-3">
        <div className="col-md-10">
          <h2 style={{ fontSize: "35px", textAlign: "center" }}>Admin Panel</h2>

          <ul className="adminfunctions">
            <li>
              <Link to={'/admin/userslist'} style={{color: 'white'}}>Users List</Link>
            </li>
            <li>
            <Link to={'/admin/foodslist'} style={{color: 'white'}}>Food List</Link>
            </li>
            <li>
            <Link to={'/admin/addfood'} style={{color: 'white'}}>Add Food</Link>
            </li>
            <li>
            <Link to={'/admin/orderslist'} style={{color: 'white'}}>Orders List</Link>
            </li>
          </ul>


          <Switch>
              <Route path="/admin" component={Userslist} exact/>
              <Route path="/admin/userslist" component={Userslist} exact/>
              <Route path="/admin/orderslist" component={Orderslist} exact/>
              <Route path="/admin/foodslist" component={Foodslist} exact/>
              <Route path="/admin/addfood" component={Addfood} exact/>
              <Route path="/admin/editfood/:foodid" component={Editfood} exact/>
          </Switch>
        </div>
      </div>
    </div>
  );
}
           
          

