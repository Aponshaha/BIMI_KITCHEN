import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoods } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Food from "../components/Food";
import Filter from "../components/Filter";
import Carousel from 'react-bootstrap/Carousel';

export default function Homescreen() {
  const dispatch = useDispatch();

  const foodsstate = useSelector((state) => state.getAllFoodsReducer);

  const { foods, error, loading } = foodsstate;

  useEffect(() => {
    dispatch(getAllFoods());
  }, []);

  return (
    <div className="row justify-content-center">
      <div style={{ display: 'block', width: '100%', height: '100%', padding: 30 }}>
        <h4 className="justify-content-center">React-Bootstrap Carousel Component</h4>
        <Carousel>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
              alt="Image One"
            />
            <Carousel.Caption>
              <h3>Label for first slide</h3>
              <p>Sample Text for Image One</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
              alt="Image Two"
            />
            <Carousel.Caption>
              <h3>Label for second slide</h3>
              <p>Sample Text for Image Two</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <Filter />
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error='Something went wrong' />
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
