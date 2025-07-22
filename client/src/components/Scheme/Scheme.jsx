import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Scheme.css";
import image2 from './Screenshot (4).png';

export const Scheme = () => {
  const [land, setLand] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [submitted, setSubmitted] = useState(false); // State to track if the form is submitted
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSchemes() {
      try {
        const response = await axios.get("http://localhost:3001/scheme/page");
        setSchemes(response.data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    }

    fetchSchemes();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const handleSubmit = async () => {
    try {
      const response = await axios.get("http://localhost:3001/scheme/land", {
        params: { land: land }
      });
      setSchemes(response.data);
      setSubmitted(true); // Set submitted to true after fetching schemes
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
  };

  const handleApply = (scheme) => {
    // Save the applied scheme name in local storage
    localStorage.setItem("appliedSchemeName", scheme.scheme_name);
    // Navigate to the Apply page
    navigate(`/apply`);
  };

  return (
    <div className="scheme-container">
      <div className="top-right">
        <input
          placeholder="Enter your land details (In Acres)"
          type="text"
          value={land}
          onChange={(e) => setLand(e.target.value)}
          className="schemesearch"
        />
        <button className="schemesearchbutton" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="governmentscheme">
        <img src={image2} alt="Government Scheme" className="scheme-image" />
      </div>
      {/* Display table */}
      <div className="table-container">
        <table className="scheme-table">
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Description</th>
              <th>Income</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme, index) => (
              <tr key={index}>
                <td>{scheme.scheme_name}</td>
                <td>{scheme.description}</td>
                <td>₹{scheme.income}</td>
                <td>
                  <button className="scheme-but" onClick={() => handleApply(scheme)}>
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
