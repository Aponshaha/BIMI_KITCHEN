import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addFood } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'

const Addfood = () => {

    const [name, setname] = useState("");
    const [smallprice, setsmallprice] = useState();
    const [mediumprice, setmediumprice] = useState();
    const [largeprice, setlargeprice] = useState();
    const [image, setimage] = useState("");
    const [description, setdescription] = useState("");
    const [category, setcategory] = useState("");
    
    const dispatch = useDispatch()

    const addFoodstate = useSelector(state => state.addFoodReducer)
    const {success , error , loading} = addFoodstate

    function formHandler(e){
        e.preventDefault();

        const food = {
        name ,
        image,
        description,
        category,
        prices:{
            small : smallprice,
            medium : mediumprice,
            large : largeprice
        }
        }

        console.log(food);
        dispatch(addFood(food));
    }

    return (
        <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
            <h1>Addfood</h1>
            {loading && (<Loading/>)}
            {error && (<Error error='Something went wrong'/>)}
            {success && (<Success success='New Food added successfully'/>)}
            <form onSubmit={formHandler}>
                <input
                    className="form-control"
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => {
                        setname(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="small varient price"
                    value={smallprice}
                    onChange={(e) => {
                        setsmallprice(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="medium varient price"
                    value={mediumprice}
                    onChange={(e) => {
                        setmediumprice(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="large varient price"
                    value={largeprice}
                    onChange={(e) => {
                        setlargeprice(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="category"
                    value={category}
                    onChange={(e) => {
                        setcategory(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => {
                        setdescription(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="image url"
                    value={image}
                    onChange={(e) => {
                        setimage(e.target.value);
                    }}
                />
                <button className='btn mt-3' type='submit'>Add Food</button>
            </form>
        </div>
    );
}

export default Addfood;
