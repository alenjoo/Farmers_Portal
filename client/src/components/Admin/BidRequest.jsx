import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BidRequest.css';

export const BidRequest = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [entries, setEntries] = useState(10); // Default number of entries
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pending-requests');
        setPendingRequests(response.data);
        // Calculate total pages based on number of entries
        setTotalPages(Math.ceil(response.data.length / entries));
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests(); // Call fetchPendingRequests when component mounts
  }, [currentPage, entries]);

  const handleEntriesChange = (e) => {
    setEntries(parseInt(e.target.value)); // Parse the selected value to integer
    setCurrentPage(1); // Reset current page to 1 when changing entries
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage does not go below 1
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages)); // Ensure currentPage does not exceed totalPages
  };

  const handleApprove = async (id) => {
    console.log('Product ID:', id); // Log the ID to check if it's passed correctly
    try {
      await axios.put(`http://localhost:3001/pending-requests/${id}/approve`);
      const updatedRequests = pendingRequests.filter(request => request.id !== id);
      setPendingRequests(updatedRequests); // Remove the approved request from the list
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Convert timestamp to a human-readable date and time string
  };

  return (
    <div className='page-container'>
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

      <div className="pending-requests-table">
        <h2>Pending Requests</h2>
        <div className="para">
          <p>This list displays the pending requests:</p>
          <div>
            <label className="entry" htmlFor="entries">Show entries:</label>
            <select id="entries" value={entries} onChange={handleEntriesChange}>
              <option value={3}>3</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <table>
            {/* Table headers */}
            <thead>
              <tr>
                <th>Username</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Time</th>
                <th>Location</th>
                <th>Image 1</th>
                <th>Image 2</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows */}
              {pendingRequests.slice((currentPage - 1) * entries, currentPage * entries).map((request) => (
                <tr key={request.id}>
                  <td>{request.username}</td>
                  <td>{request.name}</td>
                  <td>{request.description}</td>
                  <td>{request.price}</td>
                  <td>{formatTimestamp(request.time)}</td>
                  <td>{request.location}</td>
                  <td><img src={`http://localhost:3001/${request.image}`} alt={request.name} className='product-image' /></td>
                  <td><img src={`http://localhost:3001/${request.image2}`} alt={request.name} className='product-image' /></td>
                  <td>
                    <button className="button-approve" onClick={() => handleApprove(request.id)}>Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            <p>Showing {((currentPage - 1) * entries) + 1} - {Math.min(currentPage * entries, pendingRequests.length)} of {pendingRequests.length} entries</p>
            <div>
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
              <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
