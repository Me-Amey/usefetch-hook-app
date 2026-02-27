import React from 'react'
import useFetch from './hooks/useFetch'
import './App.css'

function App() {
  const { data, loading, error } = useFetch('https://fakestoreapi.com/products')

  if (loading) return <div className="loading">Loading products...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="app">
      <h1>Product Gallery</h1>
      <div className="product-grid">
        {data && data.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <p className="category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App