import React from 'react';
import useFetch from '../hooks/useFetch';
import './ProductList.css';

const ProductList = () => {
  const API_URL = 'https://api.escuelajs.co/api/v1/products';
  const { data, loading, error, refetch } = useFetch(API_URL);

  // Loading State
  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Fetching products...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button className="retry-btn" onClick={refetch}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Success State with Data
  return (
    <div className="container">
      <header className="header">
        <h1>🛍️ Product Catalog</h1>
        <button className="refresh-btn" onClick={refetch}>
          🔄 Refresh
        </button>
      </header>

      <div className="products-grid">
        {data && data.slice(0, 20).map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.images[0] || 'https://via.placeholder.com/300'}
                alt={product.title}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                }}
              />
              <span className="product-price">${product.price}</span>
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-category">📂 {product.category.name}</p>
              <p className="product-description">
                {product.description.substring(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;