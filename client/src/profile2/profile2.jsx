import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile2.css';
import { FaUser } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { BsBank2 } from "react-icons/bs";
import { Navigate } from 'react-router-dom';

export const Profile2 = () => {
  const [profileData, setProfileData] = useState({});
  const [selectedOption, setSelectedOption] = useState('User Information');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [formData, setFormData] = useState({
    homeaddress: '',
    district: '',
    pincode: '',
    panchayath: ''
  });
  const [bankFormData, setBankFormData] = useState({
    holder_name: '',
    account_number: '',
    ifsc_code: '',
    bank_name: ''
  });

  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    if (loginId) {
      axios.get(`http://localhost:3001/profile/farmer/${loginId}`)
        .then(response => {
          setProfileData(response.data);
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/address?loginId=${localStorage.getItem('loginId')}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching address data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/account?loginId=${localStorage.getItem('loginId')}`)
      .then(response => {
        setBankFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching bank data:', error);
      });
  }, []);
  


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBankChange = (e) => {
    setBankFormData({
      ...bankFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const loginId = localStorage.getItem('loginId');
    axios.post('http://localhost:3001/address', { ...formData, loginid: loginId })
      .then(response => {
        console.log('Address Backend Response:', response.data);
      })
      .catch(error => {
        console.error('Address Backend Error:', error);
      });
  };
  const handleBankSubmit = () => {
    const loginId = localStorage.getItem('loginId');
    console.log('Submitting bank account form with data:', bankFormData); // Add this line
    axios.post('http://localhost:3001/account', { ...bankFormData, loginid: loginId })
      .then(response => {
        console.log('Bank Account Backend Response:', response.data);
      })
      .catch(error => {
        console.error('Bank Account Backend Error:', error);
      });
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLogoutClicked(true);
  };

  const handleEditProfile = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="profile-container-farmer">
      <div className="profile-container1-farmer">
        <h5 className="profile1-h4-farmer">USER PROFILE</h5>
        <h1 className="profile1-h1-farmer">Hello {profileData.fullname}</h1>
        <p className="profile1-description-farmer">Manage your farmer bidding profile and conveniently update your address for efficient bidding processes.</p>
        
        <button className="profile1-edit-farmer" onClick={handleEditProfile}>Edit Profile</button>
      </div>
      <div className="profile-container2-farmer">
        <div className="dropdown-farmer">
          <div className="dropdown-content-farmer">
            <div className="account-settings-farmer">
              <h4 className="profile-account-farmer">Account Settings</h4>
            </div>
            <FaUser className='profile-user-icon-farmer' />
            <a href="#" onClick={() => handleOptionChange('User Information')}>User Information</a>
            <FaAddressBook className='profile-address-icon-farmer' />
            <a href="#" onClick={() => handleOptionChange('Address')}>Address</a>
            <BsBank2 className='profile-bank-icon-farmer' />
            <a href="#" onClick={() => handleOptionChange('Bank Account')}>Bank Account</a>
            {isLoggedIn && (
              <>
                <IoLogOut className='profile-logout-icon-farmer' />
                <a href="#" onClick={handleLogout}>Logout</a>
              </>
            )}
            {logoutClicked && <Navigate to="/login" />}
          </div>
        </div>
        {selectedOption === 'User Information' && (
          <div className="content-farmer">
            <div className="form-container-farmer">
              <h3 className='profile-h3-farmer'>User Information</h3>
              <div className="row-farmer">
                <div className="column-farmer">
                  <label> Name</label><br />
                  <input type="text" id="name" name="name" value={profileData.fullname} readOnly /><br />
                  <label>UserName</label><br />
                  <input type="text" id="last-name" name="last-name" value={profileData.username} readOnly /><br />
                  <label>Phone</label><br />
                  <input type="tel" id="phone" name="phone" value={profileData.number} readOnly /><br />
                </div>
                <div className="column-farmer">
                  <label>Email-Address</label><br />
                  <input type="email" id="email" name="email" value={profileData.email} readOnly /><br />
                </div>
              </div>
            </div>
          </div>
        )}

{selectedOption === 'Address' && (
  <div className="content-farmer">
    <div className="form-container-farmer">
      <h3 className='address-h3-farmer'>Address</h3>
      <div className="row-farmer">
        <div className="column-farmer">
          <label>Home address:</label><br />
          <textarea id="address" name="homeaddress" value={formData.homeaddress} onChange={handleChange}></textarea>
          <label>Pincode:</label><br />
          <input type="tel" id="phone" name="pincode" value={formData.pincode} onChange={handleChange} /><br />
        </div>
        <div className="column-farmer">
       
          <label>District:</label><br />
          <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} /><br />
          <label>Panchayath:</label><br />
          <input type="text" id="panchayath" name="panchayath" value={formData.panchayath} onChange={handleChange} /><br />
        </div>
      </div>
    </div>
    <button className="profile2-address-submit" onClick={handleSubmit}>Submit</button>
  </div>
)}


        {selectedOption === 'Bank Account' && (
          <div className="content-farmer">
          <div className="form-container-farmer">
            <h3 className='address-h3-farmer'>Bank Account</h3>
            <div className="row-farmer">
              <div className="column-farmer">
                <label>Account Holder Name:</label><br />
                <input type="text" id="accountHolderName" name="holder_name" value={bankFormData.holder_name} onChange={handleBankChange} /><br />
                <label>Account Number:</label><br />
                <input type="tel" id="accountNumber" name="account_number" value={bankFormData.account_number} onChange={handleBankChange} /><br />
              </div>
              <div className="column-farmer">
                <label>IFSC Code:</label><br />
                <input type="text" id="ifscCode" name="ifsc_code" value={bankFormData.ifsc_code} onChange={handleBankChange} /><br />
                <label>Branch Name:</label><br />
                <input type="text" id="branchName" name="bank_name" value={bankFormData.bank_name} onChange={handleBankChange} /><br />
              </div>
            </div>
          </div>
          <button className="profile2-address-submit" onClick={handleBankSubmit}>Submit</button>
        </div>
        
        )}
      </div>
    </div>
  );
};
