import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import axios from 'axios';
import './Bid-History.css'; // Import CSS file for styling

export const BidHistory = () => {
  const { productId } = useParams();
  const [bidHistory, setBidHistory] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  const fetchBidHistory = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/bids/${productId}`);
      setBidHistory(response.data);
    } catch (error) {
      console.error('Error fetching bid history:', error);
    }
  }, [productId]);

  useEffect(() => {
    fetchBidHistory();
  }, [fetchBidHistory]);

  // Frontend: handleUpdateWinner function
  const handleUpdateWinner = async () => {
    try {
      // Make a GET request to admin-cart endpoint
      const response = await axios.get(`http://localhost:3001/admin-cart/${productId}`);
      console.log(response.data); // Log the entire response to see its structure

      // Extract loginId directly from response.data
      const { loginid } = response.data;
      console.log('Login ID:', loginid); // Log loginId to verify

      // Send a POST request to the message endpoint with product ID and login ID
      const message = await axios.post(`http://localhost:3001/message`, {
        loginid: loginid, // Ensure correct key name
        product_id: productId // Ensure correct key name
      });
    } catch (error) {
      console.error('Error updating winner:', error);
    }
  };

  return (
    <div>
      {/* Button styled to look like a button with useNavigate */}
      <button className="button-back" onClick={() => navigate('/live-bid')}>
        Back to Live Bid
      </button>
      <table className="bid-history-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bidHistory.map((bid, index) => (
            <tr key={index} className={bid.interested && index === bidHistory.findIndex(b => b.interested) ? 'interested-row' : ''}>
              <td>{bid.username}</td>
              <td>₹{bid.price}</td>
              <td>{bid.interested ? 'Interested' : 'Not Interested'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Beautified button to update winner */}
      <button onClick={handleUpdateWinner} className="bid-history-update">
        Update Winner
      </button>
    </div>
  );
};
