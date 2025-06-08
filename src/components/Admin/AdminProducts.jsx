import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/admin`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleFeatured = async (productId, currentStatus) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/products/${productId}/featured`, {
        featured: !currentStatus
      });
      setProducts(products.map(product => 
        product._id === productId ? response.data : product
      ));
    } catch (error) {
      console.error('Error updating featured status:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Manage Products</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.featured ? 'Yes' : 'No'}</td>
              <td>
                <button 
                  className={`btn btn-${product.featured ? 'danger' : 'success'}`}
                  onClick={() => toggleFeatured(product._id, product.featured)}
                >
                  {product.featured ? 'Remove Featured' : 'Make Featured'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;