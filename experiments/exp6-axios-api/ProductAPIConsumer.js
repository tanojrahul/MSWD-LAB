import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductAPIConsumer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducs();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=6');
      const formattedProducts = response.data.map(item => ({
        id: item.id,
        title: item.title,
        image: item.thumbnailUrl,
        price: (Math.random() * 100 + 10).toFixed(2)
      }));
      setProducts(formattedProducts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading products...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '30px auto' }}>
      <h2>Product Catalog</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            textAlign: 'center'
          }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
            />
            <p style={{ marginTop: '10px', fontSize: '14px' }}>{product.title.substring(0, 50)}...</p>
            <p style={{ color: '#28a745', fontWeight: 'bold' }}>${product.price}</p>
            <button style={{
              padding: '8px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={fetchProducts}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Refresh Products
      </button>
    </div>
  );
};

export default ProductAPIConsumer;
