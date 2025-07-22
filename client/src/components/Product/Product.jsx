import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export const Product = () => {
   
    const [uploadedProducts, setUploadedProducts] = useState([]);
    const loginid = localStorage.getItem('loginId');
    const navigate = useNavigate();
    useEffect(() => {
  
        if (loginid) {
            axios.get(`http://localhost:3001/display/${loginid}`)
                .then(response => {
                    setUploadedProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching uploaded products:', error);
                });
        }
    }, [loginid]);

    const calculateTimeLeft = (endTime) => {
        const endTimeMs = new Date(endTime).getTime();
        const now = new Date().getTime();
        let difference = endTimeMs - now;

        if (difference < 0) {
            difference = 0;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setUploadedProducts(prevProducts =>
                prevProducts.map(product => ({
                    ...product,
                    timeLeft: calculateTimeLeft(product.time)
                }))
            );
           
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    const handleviewdetails = (productId) =>{
        navigate(`/status/${productId}`)
    }
    return (
        <div className="view-container-product">
            <div className="blue-container-product">
                <div className="cart-icon-wrapper">
                    <IoBagOutline className="bag-icon" />
                </div>
                <div className="cart-green-line"></div> 
                <div className="cart-icon-wrapper-shopping">
                    <MdOutlineShoppingCart className="cart-icon" />
                </div>
                <div className="cart-ash-line"></div> 
                <div className="card-icon-wrapper-shopping">
                    <CiCreditCard1 className="card-icon" />
                </div>
                <h2 className="cart-bid-heading">Sell</h2>
      <h2 className="blue-cart-heading">PRODUCT</h2>
      <h2 className="blue-review-heading">Review</h2>
      <h2 className="blue-checkout-heading">Status</h2>
            </div>

            <div className="green-container-product">
    <ul className="product-list">
        {uploadedProducts.map(product => (
            <li key={product.id} className="product-item">
                <div className="product-details">
                    <div className="details">
                        <div className="detail">
                            <h3>Product</h3>
                            <p>{product.name}</p>
                        </div>
                        <div className="detail">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>
                        <div className="detail">
                            <h3>Price</h3>
                            <p>₹{product.price}</p>
                        </div>
                    </div>
                </div>
                <img src={`http://localhost:3001/${product.image}`} alt={product.name} className='product-img' />
                <div className="time-left-product">

                {product.timeLeft && (
                    <p>Time Left: {product.timeLeft.days} days {product.timeLeft.hours} hours {product.timeLeft.minutes} minutes {product.timeLeft.seconds} seconds</p>
                )}

                </div>
               
                <div className='product-button-container'>
                    <button onClick={() => handleviewdetails(product.id)}>View Details</button>
                </div>
            </li>
        ))}
    </ul>
</div>

        </div>
    );
};
