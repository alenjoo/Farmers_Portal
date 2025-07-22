import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './users.css';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [entries, setEntries] = useState(10); // Default number of entries
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
        // Calculate total pages based on number of entries
        setTotalPages(Math.ceil(response.data.length / entries));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call fetchUsers inside the useEffect callback

  }, [currentPage, entries]);

  // Function to handle change in number of entries
  const handleEntriesChange = (e) => {
    setEntries(parseInt(e.target.value)); // Parse the selected value to integer
    setCurrentPage(1); // Reset current page to 1 when changing entries
  };

  // Function to handle click on previous page button
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage does not go below 1
  };

  // Function to handle click on next page button
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages)); // Ensure currentPage does not exceed totalPages
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

        <div className="users_available">
          <h2>Available Users</h2>
          <div className="para">
            <p>This list displays the available users:</p>
            {/* Dropdown menu for selecting number of entries */}
            <div>
              <label className = 'entry' htmlFor="entries">Show entries:</label>
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Role</th>
                  <th>Aadhar Number</th>
                </tr>
              </thead>
              <tbody>
                {/* Display only selected number of users based on entries and current page */}
                {users.slice((currentPage - 1) * entries, currentPage * entries).map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.number}</td>
                    <td>{user.role}</td>
                    <td>{user.aadhar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
            {/* Display current page and total pages */}
            <p  >Showing {((currentPage - 1) * entries) + 1} - {Math.min(currentPage * entries, users.length)} of {users.length} entries</p>
            {/* Buttons for navigating to previous and next pages */}
            <div>
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
              <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
         
          </div>
        </div>
      </div>
    </div>
  );
};
