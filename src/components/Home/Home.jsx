import { useState, useEffect } from 'react';
import './Home.css';
import SignleProduct from '../Product/SingleProduct';
import Carousel from '../Carousel/Carousel';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/featured`);
        
        // Ensure we always have an array, even if response.data is null/undefined
        const products = Array.isArray(response.data) ? response.data : [];
        setFeaturedProducts(products);
        
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) return <div className="home__loading">Loading featured products...</div>;
  if (error) return <div className="home__error">Error: {error}</div>;
  if (!featuredProducts.length) return <div className="home__empty">No featured products found</div>;

  return (
    <div className="home">
      <div className="home__container">
        <Carousel />

        {/* First row - 2 featured products */}
        <div className="home__row">
          {featuredProducts.slice(0, 2).map(product => (
            <SignleProduct key={product._id} id={product._id} />
          ))}
        </div>

        {/* Second row - 3 featured products */}
        <div className="home__row">
          {featuredProducts.slice(2, 5).map(product => (
            <SignleProduct key={product._id} id={product._id} />
          ))}
        </div>

        {/* Third row - 1 featured product (hero product) */}
        <div className="home__row">
          {featuredProducts[5] && (
            <SignleProduct key={featuredProducts[5]._id} id={featuredProducts[5]._id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;