import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './scheme-admin.css';

export const SchemeAdmin = () => {
 
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      try {
        // Fetch applications
        const response = await axios.get("http://localhost:3001/apply/users");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    }

    fetchApplications();
  }, []);

  const handleAccept = (id) =>{
    // Remove the application from the state
    setApplications(applications.filter(application => application.id !== id));
  };
  
  const handleReject = (id) =>{
    // Remove the application from the state
    setApplications(applications.filter(application => application.id !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Send a POST request to the scheme endpoint with form data
      const response = await axios.post('http://localhost:3001/scheme', {
        name: input1,
        description: input2,
        area: input3
      });
      
      // Optionally, reset the form after successful submission
      setInput1('');
      setInput2('');
      setInput3('');
    } catch (error) {
      console.error('Error submitting scheme:', error);
    }
  };

  return (
    <div className="admin-scheme">
     
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

      <div className="title">
      <h3>Applied Users</h3>
      <div className="scheme-table">
      <table>
      <thead>
          <tr>
            
            <th>Scheme Name</th>
            <th>District</th>
            <th>Name</th>
            <th>Address</th>
            <th>Panchayath</th>
            <th>Gender</th>
            <th>Category</th>
            <th>Land</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              
              <td>{application.scheme_name}</td>
              <td>{application.district}</td>
              <td>{application.name}</td>
              <td>{application.address}</td>
              <td>{application.panchayath}</td>
              <td>{application.gender}</td>
              <td>{application.category}</td>
              <td>{application.land_area}</td>
              <td>
                <button className="admin-scheme-accept" onClick={() => handleAccept(application.id)}>Accept</button>
                <button className="admin-scheme-reject" onClick={() => handleReject(application.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <div className="scheme-input-admin">
      <h2>Add New Scheme</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            
            <input
              type="text"
              id="input1"
              value={input1}
              placeholder="Enter Scheme Name"
              onChange={(e) => setInput1(e.target.value)}
              
            />
          </div>
          <div className="input-group">
            
            <textarea
              type="text"
              id="input2"
              value={input2}
              placeholder="Enter Scheme Description"
              onChange={(e) => setInput2(e.target.value)}
            />
          </div>
          <div className="input-group">
         
            <input
              type="text"
              id="input3"
              value={input3}
              placeholder="Enter The Area"
              onChange={(e) => setInput3(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        </div>
        </div>
      </div>
    </div>
  );
};


