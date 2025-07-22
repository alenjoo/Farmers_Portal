import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LiveBid.css';
import { Link } from 'react-router-dom';

export const LiveBid = () => {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/approved-products');
        setApprovedProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / 10)); // Assuming 10 entries per page
      } catch (error) {
        console.error('Error fetching approved products:', error);
      }
    };

    fetchApprovedProducts();
  }, [currentPage]); // currentPage is the only dependency for fetching approved products

  const handleUpdateFinished = async () => {
    try {
      const response = await axios.put('http://localhost:3001/admin-cart');
      if (response.status === 200) {
        console.log('Update finished successfully.');
        // Optionally, you can update the UI to reflect the updated status
      } else {
        console.error('Failed to update finished:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating finished:', error);
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Convert timestamp to a human-readable date and time string
  };

  return (
    <div className="page-container">
      <div className="admin-page">
      <nav className="admin-navbar">
        <ul className="admin-navbar-list">
        <li className="admin-navbar-item">
              <Link to="/bid-request" className="admin-navbar-link">Bid Request</Link>
            </li>
            <li className="admin-navbar-item">
              <Link to="/live-bid" className="admin-navbar-link">Live Bid</Link>
            </li>
            <li className="admin-navbar-item active">
              <Link to="/users" className="admin-navbar-link">Users</Link>
            </li>
            <li className="admin-navbar-item">
              <Link to="/admin-scheme" className="admin-navbar-link">Scheme</Link>
            </li>
            <li className="admin-navbar-item">
              <Link to="/winner" className="admin-navbar-link">Winners</Link>
            </li>
            <li className="admin-navbar-item">
              <Link to="/complaints" className="admin-navbar-link">Complaints</Link>
            </li>
            <li className="admin-navbar-item">
              <Link to="/reviews" className="admin-navbar-link">Reviews</Link>
            </li>
            <li className="admin-navbar-item">
              <Link to="/login" className="admin-navbar-link">Logout</Link>
            </li>
        </ul>
      </nav>

        <div className="approved-products-table">
          <h2>Approved Products</h2>
          <div className="para">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Image</th>
                  
                  <th>Bid History</th>
                </tr>
              </thead>
              <tbody>
                {approvedProducts.slice((currentPage - 1) * 10, currentPage * 10).map((product) => (
                  <tr key={product.id}>
                    <td>{product.username}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{formatTimestamp(product.time)}</td>
                    <td>{product.location}</td>
                    <td>
                      <img src={`http://localhost:3001/${product.image}`} alt={product.name} className="product-image" />
                    </td>
                    
                    <td>
                      <Link to={`/bid-history/${product.id}`} className="bid-history-link">View Bid History</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <div>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
                <button onClick={handleUpdateFinished}>Update Finished</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
