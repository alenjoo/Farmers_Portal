import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './winner.css';

export const Winner = () => {
  const [winnersData, setWinnersData] = useState([]);
  const [entries, setEntries] = useState(10); // Default number of entries
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  useEffect(() => {
    const fetchWinnersData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/winner/full');
        setWinnersData(response.data);
        // Calculate total pages based on number of entries
        setTotalPages(Math.ceil(response.data.length / entries));
      } catch (error) {
        console.error('Error fetching winners:', error);
      }
    };

    fetchWinnersData(); // Call fetchWinnersData when component mounts
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
      <div className="winner-table">
        <h2>Winners Details</h2>
        <div className="para">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Product Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {winnersData.slice((currentPage - 1) * entries, currentPage * entries).map((winner, index) => (
                <tr key={index}>
                  <td>{winner.fullname}</td>
                  <td>{winner.username}</td>
                  <td>{winner.name}</td>
                  <td>{winner.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            <p>Showing {((currentPage - 1) * entries) + 1} - {Math.min(currentPage * entries, winnersData.length)} of {winnersData.length} entries</p>
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
