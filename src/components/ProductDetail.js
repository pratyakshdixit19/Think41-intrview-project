import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading product details...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error loading product.</p>;
  if (!product) return <p style={{ textAlign: 'center' }}>Product not found.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>{product.title || 'No Title'}</h2>
        <p><strong>Price:</strong> ₹{product.price || 'N/A'}</p>
        <p><strong>Description:</strong> {product.description || 'N/A'}</p>
        <p><strong>Name:</strong> {product.name || 'N/A'}</p>
        <p>
          <strong>Buy Now:</strong>{' '}
          <a href={product.link} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
            {product.link ? 'Click Here' : 'N/A'}
          </a>
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px'
          }}
        >
          Back to Product List
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
