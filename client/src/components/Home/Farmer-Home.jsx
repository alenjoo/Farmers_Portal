import React, { useState, useEffect } from 'react';
import './customerHome.css'; // Import CSS file
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

export const FarmerHome = () => {

    const navigate=useNavigate();
const slides = [
{
image: require('../Assets/S2.jpg'),
heading:"HOW IT WORKS",
content:"Effortless Farming Solutions - Empowering Farmers with Farmers Portal"
},
{
image: require('../Assets/S3.jpg'),
heading:"OUR SERVICES",
content:"Farmers Portal offers a range of services to enhance the agricultural value chain and cultivate success."
},
{
image: require('../Assets/S6.jpg'),
heading:"OUR VALUE PROPOSITION",
content:"Farmers Portal: Collaborating for Prosperity in Agriculture."
}
// Add more slides here if needed
];
const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
const interval = setInterval(() => {
setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
}, 4000); // Change slide every 3 seconds

return () => clearInterval(interval);
}, [slides.length]);



return (
<div className="customer-home">
<nav className="navbar">
<div className="navbar-left">
<div className="navbar-links">
<Link to = '/CustomerHome'>HOME</Link>
<Link to = '/Scheme'>SCHEME</Link>
<Link to = '/bid'>SELL</Link>
<Link to = '/product'>PRODUCT</Link>
<Link to = '/Profile2'>PROFILE</Link>
</div>

</div>
</nav>
<div className="slideshow-container">
{slides.map((slide, index) => (
<div key={index} className={index === currentSlideIndex ? "slide active" : "slide"}>

<img src={slide.image} alt={`Slide ${index + 1}`} className="image" />
<div className="slide-content">
<h2>{slide.heading}</h2>
<p>{slide.content}</p>
</div>
</div>
))}
</div>
</div>
);
};
