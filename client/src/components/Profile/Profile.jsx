import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import { FaUser, FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { Navigate } from 'react-router-dom';
import { MdRateReview } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

export const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [selectedOption, setSelectedOption] = useState('User Information');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [order, setMyorder] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
 const navigate = useNavigate();
  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    if (loginId) {
      axios.get(`http://localhost:3001/profile/${loginId}`)
        .then(response => {
          setProfileData(response.data);
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, []);

  



  useEffect(() => {
    const loginId = localStorage.getItem('loginId');
    if (loginId && selectedOption === 'My Order') {
      axios.get(`http://localhost:3001/winner/order/${loginId}`)
      .then(response => {
        console.log('Received response from backend:', response.data); // Add this line to log the received data
        setMyorder(response.data);
      })
      .catch(error => {
        console.error('Error fetching My order data:', error);
      });
    
    }
  }, [selectedOption]); // Add selectedOption to the dependency array
  

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const loginId = localStorage.getItem("loginId");
        const response = await axios.get(`http://localhost:3001/message/${loginId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessage();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    };
    
    const handleSearchSubmit = () => {
        navigate(`/search/${searchQuery}`);
    };
    

  const handleSubmitReview = () => {
    // Send a post request with the review content and login id
    const loginId = localStorage.getItem('loginId');
    axios.post('http://localhost:3001/complain/review', {
      content: reviewContent,
      username: loginId
    })
    .then(response => {
      // Handle success response if needed
      console.log('Review submitted successfully');
    })
    .catch(error => {
      // Handle error if needed
      console.error('Error submitting review:', error);
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


  const handleReceiveProduct = (winnerId) => {
    axios.put(`http://localhost:3001/winner/received/${winnerId}`)
      .then(response => {
        // Handle success response if needed
        console.log('Product received successfully');
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error receiving product:', error);
      });
  }
  

  const handleNotReceiveProduct = (winnerId, productId, username) => {
    
    axios.post('http://localhost:3001/complain', {
      winnerId,
      productId,
      username
    })
    .then(response => {
      // Handle success response if needed
      console.log('Complaint submitted successfully');
    })
    .catch(error => {
      // Handle error if needed
      console.error('Error submitting complaint:', error);
    });
  }
  
  return (
    <div className="profile-container">
      <div className="profile-container1">
        <h5 className="profile1-h4">USER PROFILE</h5>
        <h1 className="profile1-h1">Hello {profileData.fullname}</h1>
        <p className="profile1-description">Manage your customer bidding profile.</p>
        <div className="profile1-search-div">
          <input type="text" className="profile1-search" placeholder="Search"  value={searchQuery}
onChange={handleSearchChange}/>
          <IoSearch className='profile1-search-icon' onClick={handleSearchSubmit}/>
        </div>
        <button className="profile1-edit" onClick={handleEditProfile}>Edit Profile</button>
      </div>
      <div className="profile-container2">
        <div className="dropdown">
          <div className="dropdown-content">
            <div className="account-settings">
              <h4 className="profile-account">Account Settings</h4>
            </div>
            <FaUser className='profile-user-icon'/>
            <a href="#" onClick={() => handleOptionChange('User Information')}>User Information</a>
            <FaBell className='profile-address-icon'/>
            <a href="#" onClick={() => handleOptionChange('Notifications')}>Notifications</a>
            <MdRateReview className='profile-review-icon'/>
            <a href="#" onClick={() => handleOptionChange('My Order')}> My Order </a>
            <FaShoppingCart className='profile-cart-icon'/>
            <a href="#" onClick={() => handleOptionChange('Reviews and Suggestions')}> Reviews and Suggestions </a>
            {isLoggedIn && (
              <>
                <IoLogOut className='profile-logout-icon'/>
                <a href="#" onClick={handleLogout}>Logout</a>
              </>
            )}
            {logoutClicked && <Navigate to="/login" />}
          </div>
        </div>
        {selectedOption === 'User Information' && (
          <div className="content">
            <div className="form-container">
              <h3 className='profile-h3'>User Information</h3>
              <div className="row">
                <div className="column">
                  <label> Name</label><br/>
                  <input type="text" id="name" name="name" value={profileData.fullname} readOnly /><br />
                  <label>UserName</label><br />
                  <input type="text" id="last-name" name="last-name" value={profileData.username} readOnly /><br />               
                  <label>Phone</label><br />
                  <input type="tel" id="phone" name="phone" value={profileData.number} readOnly /><br />
                </div>
                <div className="column">
                  <label>Email-Address</label><br />
                  <input type="email" id="email" name="email" value={profileData.email} readOnly /><br />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedOption === 'Notifications' && (
          <div className="content">
            <div className="notifications-container">
              <h3 className="notifications-header">Notifications</h3>
              {notifications.map((notification, index) => (
                <div className="notification-item" key={index}>
                  <div className="notification-content">
                    <span className="notification-text">congratulations you have won the bid on {notification.productName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
       {selectedOption === 'My Order' && (
  <div className="content">
    <div className="order-container">
      <h3 className="order-header">My Order</h3>
      {order.map((item, index) => (
        <div key={index} className="order-item">
    <img src={`http://localhost:3001/${item.image}`} alt={item.name} className='order-item-image' />
          <p>{item.name}</p>
          <p>Have you received this product?</p>
          <div>
            <button onClick={() => handleReceiveProduct(item.winnerid)}>Yes</button>
            <button onClick={() => handleNotReceiveProduct(item.winnerid, item.productid, item.username)}>No</button>

          </div>
        </div>
      ))}
    </div>
  </div>
)}


{selectedOption === 'Reviews and Suggestions' && (
  <div className="content">
  <div className="reviews-container">
    <h3 className="reviews-header">Reviews and Suggestions</h3>
    <div className="input-container">
      <textarea 
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
        placeholder="Write your review or suggestion"
        className="review-textarea"
      />
      <button className="submit-button" onClick={handleSubmitReview}>Submit</button>
    </div>
  </div>
</div>
)}
      </div>
    </div>
  );
};
