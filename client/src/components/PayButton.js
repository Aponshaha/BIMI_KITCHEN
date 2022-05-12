import axios, { Axios } from "axios";
import { useSelector } from "react-redux";

const Paybutton = (items) =>{
    const handleCheckout = () => {
        axios.post(`/api/stripe/create-checkout-session`,{
            items,
            // userId: user._id
        })
        .then((res)=>{
            if (res.data.url) {
                window.location.href = res.data.url
            }
        })
        .catch((err) => console.log(err.message))
    };
    return (
        <>
            <button onClick={()=>handleCheckout()}>
                Checkout
            </button>
        </>
    )
}

export default Paybutton;