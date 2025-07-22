import React, { useEffect, useState } from 'react';
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { Link } from 'react-router-dom';
import "./checkout.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Checkout = () => {
    const { productId } = useParams();
    const [selectedPayment, setSelectedPayment] = useState(''); 
    const [address, setAddress] = useState({
        homeaddress: '',
        panchayath: '',
        district: '',
        pincode: '',
    });
    const [product, setProduct] = useState({
        name:'',
        price:'',
    });

    useEffect(() => {
        // Function to fetch product and login details
        const fetchData = async () => {
            try {
                // Fetch product details
                const productResponse = await axios.get(`http://localhost:3001/cart/checkou/${productId}`);
              
                const productData = productResponse.data;
                setProduct(productData);
                
                // Extract loginId from productData
                const loginId = productData.loginId;
    
                // Fetch address details based on loginId
                const addressResponse = await axios.get(`http://localhost:3001/address/checkoutaddress/${loginId}`);
                const addressData = addressResponse.data;
    
                // Set the address state with the fetched data
                setAddress(addressData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        // Call fetchData function
        fetchData();
    }, [productId]);
    
    // Function to load Razorpay script
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    // Function to display Razorpay payment form
    async function displayRazorpay() {
        // Load Razorpay script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js"); 
        console.log("Razorpay Script Loaded:", res);

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        try {
            // Fetch product details
            const productResponse = await axios.get(`http://localhost:3001/products/checkou/${productId}`);
            const productData = productResponse.data;
            const loginId = productData.loginId;
            const price = product.price;
            console.log(product.price);

            // Fetch farmer details based on loginId
            const farmerResponse = await axios.get(`http://localhost:3001/payment/farmers/${loginId}`);
            const farmerData = farmerResponse.data;

            // Set the name as the full name from farmer data
            const name = farmerData.fullname;

            // Create payment order
            const result = await axios.post(`http://localhost:3001/payment/orders/${price}`);
            console.log("Payment Result:", result);
            if (!result) {
                alert("Server error. Are you online?");
                return;
            }
            
            const { amount, id: order_id, currency } = result.data;

            const options = {
                key: "rzp_test_PjyY037WCzSSTi", // Enter the Key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: name, // Set the name as the full name from farmer data
                description: "Test Transaction",
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };
                    
                    console.log("Sending payment success data to server:", data);
                
                    try {
                        const result = await axios.post("http://localhost:3001/payment/success", data);
                        console.log("Payment success response from server:", result.data);
                
                        if (result.data && result.data.msg) {
                            alert(result.data.msg);
                        } else {
                            alert("Payment successful!");
                        }
                    } catch (error) {
                        console.error("Error processing payment success:", error.response ? error.response.data : error);
                        alert("Error processing payment success. Please try again later.");
                    }
                },
                prefill: {
                    name: name, // Set the name as the full name from farmer data
                    email: "example@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Farmer's Address", // You can add additional notes here
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Error processing payment. Please try again later.");
        }
    }

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    
    const handlePlaceOrderClick = async () => {
        if (selectedPayment === 'online') {
          
            displayRazorpay();
        } else {
            
            alert('Order placed successfully');
        }
    
        const loginId = localStorage.getItem('loginId');
    
      
        try {
            const paymentResponse = await axios.post(`http://localhost:3001/message/table`, {
                mode: selectedPayment,
                status: 1, 
                loginId: loginId,
                productId: productId
            });
            console.log("Payment endpoint response:", paymentResponse.data);
        } catch (paymentError) {
            console.error("Error placing payment:", paymentError);
            alert("Error placing payment. Please try again later.");
        }
    
        // Make a POST request to the winner endpoint along with the login ID and product ID
        try {
            const winnerResponse = await axios.post(`http://localhost:3001/bids/winner`, {
                loginId: loginId,
                productId: productId
            });
            console.log("Winner endpoint response:", winnerResponse.data);
        } catch (winnerError) {
            console.error("Error placing winner:", winnerError);
            alert("Error placing winner. Please try again later.");
        }
    };
    

    return (
        <div className="view-container2">
            <div className="blue-container2">
                <div className="cart-icon-wrapper2">
                    <Link to="/Bid">
                        <IoBagOutline className="bag-icon2" />
                    </Link>
                </div>
                <div className="cart-green1-line"></div> 
                <div className="cart-icon-wrapper-shopping2">
                    <MdOutlineShoppingCart className="cart-icon2" />
                </div>
                <div className="cart-green2-line"></div> 
                <div className="card-icon-wrapper-shopping2">
                    <CiCreditCard1 className="card-icon2" />
                </div>
                <h2 className="cart-bid-heading2">Bid</h2>
                <h2 className="blue-cart-heading2">Checkout</h2>
                <h2 className="blue-review-heading2">Review</h2>
                <h2 className="blue-checkout-heading2">Check Out</h2>
            </div>
            <div className="marblecontainer">
                <div className="address-box-checkout">
                    <h3 className="address-details-checkout">Address Details</h3>
                    <div className="address-input-box-checkout">
                        <label className='address-label-checkout'> Address</label>
                        <input type="text" className="input-checkout" value={address.homeaddress} readOnly/>
                    </div>
                    <div className="address-input-box-checkout">
                        <label className='address-label-checkout'> Panchayath</label>
                        <input type="text" className="input-checkout" value={address.panchayath} readOnly/>
                    </div>
                    <div className="address-input-box-checkout">
                        <label className='address-label-checkout'> District</label>
                        <input type="text" className="input-checkout" value={address.district} readOnly/>
                    </div>
                    <div className="address-input-box-checkout">
                        <label className='address-label-checkout'> Pincode</label>
                        <input type="text" className="input-checkout" value={address.pincode} readOnly/>
                    </div>
                </div>
                <div className="order-box-checkout">
                    <h3 className="order-details-checkout">Your Order</h3>
                    <div className="label-checkout">
                        <div className="product-label">
                            <label className='order-label-checkout'>Product</label>
                            <div className="product-name-checkout1">{product.name}</div>
                        </div>
                        <div className="price-label">
                            <label className='address-label-checkout'>Price</label>
                            <div className="product-name-checkout2">{product.price}</div>
                        </div>
                    </div>
                </div>
                <div className="payment-checkout">
                    <h3 className="payment-heading">Payment</h3>
                    <div className="payment-options">
                        <label className="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="online"
                                checked={selectedPayment === 'online'}
                                onChange={handlePaymentChange}
                            />
                            <p>Online Payment</p>
                        </label>
                        <p className="payment-description">Please note that the farmer will only accept orders after receiving payment through the online payment method. This ensures a secure and streamlined transaction process, allowing for smoother order fulfillment and delivery.</p>
                        <label className="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="cash"
                                checked={selectedPayment === 'cash'}
                                onChange={handlePaymentChange}
                            />
                            <p>Cash on delivery</p>
                        </label>
                    </div>
                    <button className="place-order-button" onClick={handlePlaceOrderClick}>Place Order</button>
                </div>
            </div>
        </div>
    );
};
