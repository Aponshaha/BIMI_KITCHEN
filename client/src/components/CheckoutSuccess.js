import axios, { Axios } from "axios";

const CheckoutSuccess = () => {
    // useEffect(() => {
    //     // Create PaymentIntent as soon as the page loads
    //     fetch("/api/CheckoutSuccess", {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ cartItems })
    //     })
    //       .then((res) => res.json())
    //       .then((data) => setClientSecret(data.clientSecret));
    //   }, []);
    return ( 
    <h2>
        Thank you for ordering !!!
    </h2> 
    );
}
 
export default CheckoutSuccess;