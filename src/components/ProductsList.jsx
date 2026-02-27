import React from 'react';
import useFetch from '../hooks/useFetch';
import './ProductsList.css';

const ProductsList = () => {
  const API_URL = 'https://api.escuelajs.co/api/v1/products';
  const { data, loading, error, refetch } = useFetch(API_URL);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p className="error-message">{error}</p>
        <button className="retry-btn" onClick={refetch}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="header">
        <h1>Product Gallery</h1>
        <button className="refresh-btn" onClick={refetch}>
          🔄 Refresh
        </button>
      </div>
      
      <div className="products-grid">
        {data && data.slice(0, 20).map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
              <p className="product-category">{product.category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;