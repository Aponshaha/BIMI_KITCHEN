import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoods } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Food from "../components/Food";
import Filter from "../components/Filter";



export default function Homescreen(){
  const dispatch = useDispatch();

  const foodsstate = useSelector((state) => state.getAllFoodsReducer);

  const { foods, error, loading } = foodsstate;

  useEffect(() => {
    dispatch(getAllFoods());
  }, []);
    
  return (
    <div> 
      
      <Filter />    
      <div className="row justify-content-center">
      {loading ? (
          <Loading/>
        ) : error ? (
          <Error error='Something went wrong'/>
        ) : ( 
          foods.map((food) => {
            return (
              <div className="col-md-3 m-3" key={food._id}>
                <div>
                  <Food food={food} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
