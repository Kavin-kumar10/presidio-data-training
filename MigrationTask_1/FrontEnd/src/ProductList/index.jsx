// frontend/src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        console.log(response);
        
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul style={{display:'flex',gap:"10px"}}>
        {products.map(product => (
          <div key={product._id} style={{border:"2px solid black",borderRadius:"10px",padding:"20px"}}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;