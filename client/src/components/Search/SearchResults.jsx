import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProductDetail } from '../ProductDetail/ProductDetail';

export const SearchResults = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products?query=${query}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map(product => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
  };
  const handleView = async (name,location) => {
   console.log(name,location);
    try {
      const response = await axios.get(`http://localhost:3001/products/search/${name}/${location}`);
      
      const fetchedProducts = response.data;
      
      if (response.status === 200) {
        if (fetchedProducts.length === 0) {
          alert('No products available at the specified location.');
        } else {
          setProducts(fetchedProducts);
        }
      } else {
        alert('Error fetching products. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching products by location:', error);
      alert('Error fetching products. Please try again later.');
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     
      
      <div className="location-filter">
        <input type="text" placeholder="Search the Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button type  onClick={() => handleView(query,location)}>View</button>

      </div>

    
      
      <div className="product-list">
        {products.map(product => (
          <ProductDetail key={product.id} product={product} setProduct={updateProduct} />
        ))}
      </div>
    </div>
  );
};
