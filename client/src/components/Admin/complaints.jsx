import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './complaints.css';

export const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [entries, setEntries] = useState(10); // Default number of entries
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:3001/complain');
        setComplaints(response.data);
        // Calculate total pages based on number of entries
        setTotalPages(Math.ceil(response.data.length / entries));
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints(); // Call fetchComplaints when component mounts
  }, [currentPage, entries]);

  const handleEntriesChange = (e) => {
    setEntries(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
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

      <div className="complaints-table">
        <h2>Complaints</h2>
        <div className="para">
          <p>This list displays the complaints:</p>
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
            <thead>
              <tr>
                <th>Buyer Username</th>
                <th>Seller Username</th>
                <th>Product Name</th>
              </tr>
            </thead>
            <tbody>
              {complaints.slice((currentPage - 1) * entries, currentPage * entries).map((complaint) => (
                <tr key={complaint.id}>
                  <td>{complaint.buyer_username}</td>
                  <td>{complaint.seller_username}</td>
                  <td>{complaint.product_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <p>Showing {((currentPage - 1) * entries) + 1} - {Math.min(currentPage * entries, complaints.length)} of {complaints.length} entries</p>
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
