import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bid.css';


export const Bid = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [productname, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');
    const [login_Id, setLoginId] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [image2, setImage2] = useState(null); // Additional state for the second image

    useEffect(() => {
        const storedUserId = localStorage.getItem('loginId');
        setLoginId(storedUserId);
    }, []);

    const handleImageChange = (event) => {
        const files = event.target.files;
        const newImages = [];
        for (let i = 0; i < Math.min(files.length, 2); i++) { // Limiting to 2 images
            newImages.push(files[i]);
        }
        setSelectedImages(newImages);
    };

    const handleImage2Change = (event) => {
        const file = event.target.files[0];
        setImage2(file);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', productname);
        formData.append('description', description);
        formData.append('price', price);
        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('productImages', selectedImages[i]);
        }
        formData.append('productImage2', image2); // Append the second image
        formData.append('time', time);
        formData.append('location', location);
        formData.append('login_id', login_Id);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload response:', response);
            alert(response.data.message);
        } catch (error) {
            setMessage('An error occurred while uploading the images');
            console.error('Error uploading images:', error);
        }

        // Clear form fields after submission
        setSelectedImages([]);
        setImage2(null);
        setProductName('');
        setDescription('');
        setPrice('');
        setTime('');
        setLocation('');
    };

    return (
        <div className="bidpage">
            <nav className="navbar2">
                <div className="navbar2-left"></div>
                <div className="navbar2-right"></div>
            </nav>
            <div className="container">
                <div className="form-section">
                    <form onSubmit={handleFormSubmit}>
                        <div className="bid-first-half">
                            <input type="text" placeholder="Product name" value={productname} onChange={(event) => setProductName(event.target.value)} />
                            <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                            <input type="number" placeholder="Price" value={price} onChange={(event) => setPrice(event.target.value)} />
                            <input type="datetime-local" value={time} onChange={(event) => setTime(event.target.value)} />
                            <input type="text" placeholder='Location' value={location} onChange={(event) => setLocation(event.target.value)} />
                        </div>
                        <button type="submit">Confirm</button>
                    </form>
                </div>
                <div className="image-container">
                    <div className="half-container">
                        <input type="file" onChange={handleImageChange} accept="image/*" multiple={false} />
                        {selectedImages.length > 0 && (
                            <div className="selected-images">
                                {selectedImages.map((image, index) => (
                                    <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="half-container">
                        <input type="file" onChange={handleImage2Change} accept="image/*" />
                        {image2 && <img src={URL.createObjectURL(image2)} alt="Uploaded Image 2" />}
                    </div>
                </div>
            </div>
            
        </div>
    );
};
