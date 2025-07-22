import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { Link } from 'react-router-dom';

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [bidAmount, setBidAmount] = useState('');
    const [activeBidProductId, setActiveBidProductId] = useState(null); // Track the active bid product ID

    const navigate = useNavigate();
    const loginId = localStorage.getItem('loginId');

    const handleViewResult = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3001/admin-cart/${loginId}/${productId}`);
            const message = response.data.message;
            
            if (message === 'You won the bid') {
                navigate(`/checkout/${productId}`);
            } else {
                alert(message);
            }
        } catch (error) {
            console.error('Error fetching product status:', error);
        }
    };

    useEffect(() => {
        if (loginId) {
            axios.get(`http://localhost:3001/cart/${loginId}`)
                .then(response => {
                    setCartItems(response.data);
                })
                .catch(error => {
                    console.error('Error fetching cart products:', error);
                });
        }
    }, [loginId]);

    const handleBid = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3001/cart/status/${productId}`)
            const { status } = response.data; // Extract status from response.data
            if (status === 'active') {
                setActiveBidProductId(productId); // Set the active bid product ID
            } else {
                alert("Bidding Time is Over");
            }
        } catch (error) {
            console.error('Error checking bid status:', error);
        }
    };
    

    const handleSubmit = async (productId, currentBid, newPrice) => {
        try {
            const storedUserId = localStorage.getItem('loginId');
            if (!storedUserId) {
                console.error('User ID not found in localStorage.');
                return;
            }
            if (parseFloat(newPrice) > parseFloat(currentBid)){
                const updateProductResponse = await axios.put(`http://localhost:3001/products/${productId}`, {
                    newPrice: newPrice,
                    userId: storedUserId
                });
                
                if (updateProductResponse.status === 200) {
                    // Update product price in cart items
                    setCartItems(prevItems =>
                        prevItems.map(item => {
                            if (item.productId === productId) {
                                return {
                                    ...item,
                                    price: newPrice
                                };
                            }
                            return item;
                        })
                    );

                    // Update cart item's price in the cart table
                    const updateCartResponse = await axios.put(`http://localhost:3001/cart/${storedUserId}/${productId}`, {
                        newPrice: newPrice
                    });

                    if (updateCartResponse.status === 200) {
                        setActiveBidProductId(null); // Reset active bid product ID
                        await insertBid(productId, storedUserId, newPrice);
                    } else {
                        console.error('Error updating cart item price:', updateCartResponse.error);
                    }
                } else {
                    console.error('Error updating product price:', updateProductResponse.error);
                }
            } else {
                alert("New bid amount must be greater than the current bid amount.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const insertBid = async (productId, loginId, amount) => {
        try {
            const response = await axios.post(`http://localhost:3001/bids/update/${productId}`, {
                loginId: loginId,
                amount: amount
            });

            if (response.status === 201) {
                alert('Bid placed successfully!');
            } else {
                console.error('Error inserting bid details:', response.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNotInterested = async (productId, loginId) => {
        try {
            const confirmNotInterested = window.confirm("Are you sure you want to mark this product as Not Interested?");
            if (confirmNotInterested) {
                // Update interested to 0 in the bids table
                await axios.put(`http://localhost:3001/bids/${productId}`, {
                    loginId: loginId,
                    interested: 0
                });

                // Update interested to 0 in the winner table
                await axios.put(`http://localhost:3001/bids/winner/${productId}`, {
                    loginId: loginId,
                    interested: 0
                });

                // You can add additional logic here if needed

            }
        } catch (error) {
            console.error('Error updating interested status:', error);
        }
    };

    return (
        <div className="view-container">
            {/* Cart UI elements */}
            <div className="blue-container">
                <div className="cart-icon-wrapper">
                    <Link to="/Bid">
                        <IoBagOutline className="bag-icon" />
                    </Link>
                </div>
                <div className="cart-green-line"></div> 
                <div className="cart-icon-wrapper-shopping">
                    <MdOutlineShoppingCart className="cart-icon" />
                </div>
                <div className="cart-ash-line"></div> 
                <div className="card-icon-wrapper-shopping">
                    < CiCreditCard1 className="card-icon" />
                </div>
                <h2 className="cart-bid-heading">Bid</h2>
                <h2 className="blue-cart-heading">CART</h2>
                <h2 className="blue-review-heading">Review</h2>
                <h2 className="blue-checkout-heading">Check Out</h2>
            </div>
            <div className="green-container">
                <ul className="cart-list">
                    {cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <div className="product-details">
                                <div className="details">
                                    <div className="detail">
                                        <h3>Product</h3>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="detail">
                                        <h3>Description</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="detail">
                                        <h3>Price</h3>
                                        <p>₹{item.price}</p>
                                    </div>
                                </div>
                            </div>
                            <img
                                src={`http://localhost:3001/${item.image}`}
                                alt={item.name}
                                className="cart-img"
                            />
                            <div className="button-container">
                                <button className="cartbid" onClick={() => handleBid(item.id)}>Bid</button>
                                <button className="cart-interest" onClick={() => handleNotInterested(item.id, loginId)}>Not Interested</button>
                                <button onClick={() => handleViewResult(item.id)} className="results">View Result</button>
                            </div>
                            {/* Bid input box for the active bid product */}
                            {activeBidProductId === item.id && (
                                <div className="bid-input">
                                    <input
                                        type="number"
                                        className="input-bid"
                                        placeholder="Enter your bid"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                    />
                                    <button className="cart-submit" onClick={() => handleSubmit(item.id, item.price, bidAmount)}>
                                        Submit
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
