import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addToBasket, selectBasketItems } from "../../store/slices/basketSlice";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css'; // We'll create this CSS file

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Products() {
  const dispatch = useDispatch();
  const basketItems = useSelector(selectBasketItems);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToBasket = (product) => {
    dispatch(addToBasket({
      id: product._id,
      title: product.name,
      image: product.images[0],
      price: product.price,
      rating: product.rating,
      quantity: 1
    }));
  };

  const isInBasket = (productId) => {
    return basketItems.some(item => item.id === productId);
  };

  if (loading) return (
    <div className="products-container">
      {Array(6).fill().map((_, index) => (
        <div key={index} className="product-skeleton">
          <div className="product-skeleton__image" />
          <div className="product-skeleton__text" />
          <div className="product-skeleton__button" />
        </div>
      ))}
    </div>
  );

  console.log(products, products.length);
  

  if (error) return <div className="error-message">Error: {error}</div>;
  if (!products.length) return <div className="empty-message">No products available</div>;

  return (
    <div className="products-container">
      {products.map((product) => {
        const inBasket = isInBasket(product._id);
        
        return (
          <motion.div 
            key={product._id}
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link to={`/products/${product._id}`} className="product-link">
              <motion.img 
                src={product.images[0] || '/placeholder-image.jpg'} 
                alt={product.name}
                className="product-card__image"
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            </Link>

            <div className="product-card__info">
              <Link to={`/products/${product._id}`} className="product-link">
                <h3 className="product-card__title">{product.name}</h3>
              </Link>
              
              <p className="product-card__price">
                <small>$</small>
                <strong>{product.price.toFixed(2)}</strong>
                {product.discount > 0 && (
                  <span className="product-card__discount">
                    {product.discount}% off
                  </span>
                )}
              </p>

              <div className="product-card__rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating) ? '⭐' : i < product.rating ? '✨' : '☆'}
                  </span>
                ))}
                <span>({product.reviews?.length || product.numReviews || 0})</span>
              </div>
            </div>

            <motion.button
              onClick={() => handleAddToBasket(product)}
              className={`product-card__button ${inBasket ? 'product-card__button--added' : ''}`}
              whileHover={!inBasket ? { scale: 1.05 } : {}}
              whileTap={!inBasket ? { scale: 0.95 } : {}}
              disabled={inBasket}
            >
              {inBasket ? '✓ Added to Cart' : 'Add to Cart'}
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}

export default Products;