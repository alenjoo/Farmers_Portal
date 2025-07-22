import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productDetail.css';

export const ProductDetail = ({ product, setProduct }) => {
    const [bidAmount, setBidAmount] = useState('');
    const [isBidInputVisible, setIsBidInputVisible] = useState(false);
   

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(product.time));
        }, 1000);

        return () => clearInterval(timer);
    }, [product.time]);

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
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(product.time));
    const handleBid = () => {
       
        setIsBidInputVisible(true);
    };

    const handleSubmit = async () => {
        try {
            const storedUserId = localStorage.getItem('loginId');
            if (!storedUserId) {
                console.error('User ID not found in localStorage.');
                return;
            }
           
    
            if (parseFloat(bidAmount) > parseFloat(product.price)) {
                const cartResponse = await axios.post(`http://localhost:3001/cart/add/${product.id}/${bidAmount}/${storedUserId}`);

                if (cartResponse.status === 200) {
                  const updateProductResponse = await axios.put(`http://localhost:3001/products/${product.id}`, {
                    newPrice: bidAmount,
                    userId: storedUserId
                  });
          
                  if (updateProductResponse.status === 200) {
                    const insertResponse = await axios.post(`http://localhost:3001/bids/update/${product.id}`, {
                      loginId: storedUserId,
                      amount: bidAmount
                    });
          
                    if (insertResponse.status === 201) {
                      alert('Bid placed successfully!');
                      // Update product price in state
                      // setProduct({ ...product, price: newPrice });
                      setIsBidInputVisible(false);
                    } else {
                      console.error('Error inserting bid details:', insertResponse.error);
                    }
                  } else {
                    console.error('Error updating product price:', updateProductResponse.error);
                  }
                } else {
                  console.error('Error adding product to cart:', cartResponse.error);
                }
              } else {
                alert("New bid amount must be greater than the current bid amount.");
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
    

    return (
      <div className="result">
      <div className="searchproduct-detail">
        <div className="searchproduct-info">
          <h2>Product Name : {product.name}</h2>
          <p>Current Bid Amount: ₹{product.price}</p>
          <p>Description: {product.description}</p>
          <p>Time Left: {timeLeft.days}  days {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds</p>
          <p>Location: {product.location}</p>
          <div className="bid-input">
           
          <button className="bid-button" onClick={handleBid}>Bid</button>

            {isBidInputVisible && (
                    <div className="bid-input">
                        <input type="text" className="input-bid" placeholder='Enter your bid amount' value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                )}
          </div>
        </div>
        <div className="image-container">
        <img src={`http://localhost:3001/${product.image}`} alt={product.name} className='searchproductdetail-img' />
            
        </div>
      </div>
   

    
    </div>
    );
};
