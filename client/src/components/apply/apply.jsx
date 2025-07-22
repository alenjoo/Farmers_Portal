import React, { useState } from "react";

import "./apply.css";
import axios from "axios";


export const Apply = () => {
 
  
  const appliedSchemeName = localStorage.getItem("appliedSchemeName");
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  }
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [formData, setFormData] = useState({
    schemeName: appliedSchemeName || "",
    district: "",
    name: "",
    address: "",
    panchayath: "",
    gender: "",
    category: "",
    phnno: "",
    land: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const loginId = localStorage.getItem('loginId');
  
    try {
      const response = await axios.post("http://localhost:3001/apply", {
        ...formData,
        gender: selectedGender, // Set gender value to selectedGender
        category: selectedCategory, // Set category value to selectedCategory
        login_id: loginId
      });
  
      alert('Application submitted successfully');
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error submitting application:', error.message);
    }
  };
  
  
  

  
  return (
    <div className="apply-container">
      <div className="main-content">
        <h1 className="apply-title">Apply for Scheme</h1>
        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-group">
            <label htmlFor="schemeName" className="form-label">Scheme Name:</label>
            <input
              type="text"
              id="schemeName"
              name="schemeName"
              value={formData.schemeName}
              onChange={handleChange}
              required
              readOnly
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="district" className="form-label">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address:</label>
            <textarea
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="panchayath" className="form-label">Panchayath:</label>
            <input
              type="text"
              id="panchayath"
              name="panchayath"
              value={formData.panchayath}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group2">
            
          <label>
        <input 
          type="radio" 
          name="gender" 
          value="male" 
          checked={selectedGender === 'male'} 
          onChange={handleGenderChange} 
        />
        Male
      </label>
      <label>
        <input 
          type="radio" 
          name="gender" 
          value="female" 
          checked={selectedGender === 'female'} 
          onChange={handleGenderChange} 
        />
        Female
      </label>
      
      
            
          </div>
          <div className="form-group2">
          <label>
        <input 
          type="radio" 
          name="category" 
          value="apl" 
          checked={selectedCategory === 'apl'} 
          onChange={handleCategoryChange} 
        />
        APL 
      </label>
      <label>
        <input 
          type="radio" 
          name="category" 
          value="bpl" 
          checked={selectedCategory === 'bpl'} 
          onChange={handleCategoryChange} 
        />
        BPL 
      </label>
      
          </div>
          <div className="form-group">
            <label htmlFor="phnno" className="form-label">Phone Number:</label>
            <input
              type="text"
              id="phnno"
              name="phnno"
              value={formData.phnno}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="land" className="form-label">Land Area (In Acres):</label>
            <input
              type="text"
              id="land"
              name="land"
              value={formData.land}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="apply-button">
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};
