import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addToBasket, selectBasketItems } from "../../store/slices/basketSlice";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';
import './SingleProduct.css';

function SingleProduct({ id }) {
  const dispatch = useDispatch();
  const basketItems = useSelector(selectBasketItems);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MAX_QUANTITY = 10;

  if (!id) {
    return <div className="product product--error">Error: Missing Product ID</div>;
  }

  // Fetch product data from backend
  useEffect(() => {
    const fetchProduct = async () => {
  try {
    console.log(`Fetching product ${id}`);
    const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
    setProduct(response.data); // Add this line to store the product data
  } catch (err) {
    console.error("Full error:", {
      config: err.config,
      response: err.response?.data
    });
    setError(err.response?.data?.error || err.message);
  } finally {
    setLoading(false);
  }
};

    fetchProduct();
  }, [id]);

  // Check if product is already in basket
  useEffect(() => {
    if (!product) return;

    const existingItem = basketItems.find(item => item.id === id);
    setIsAdded(!!existingItem);
    if (existingItem) setQuantity(existingItem.quantity);
  }, [basketItems, id, product]);

 const safeProduct = {
  _id: product?._id || id,
  name: product?.name || 'Product Name',
  price: product?.price || 0,
  discount: product?.discount || 0,  // Note: Your backend has 'discount' (15) not 'discount'
  rating: product?.rating || 0,
  reviews: product?.reviews?.length || product?.numReviews || 0,  // Handle both array and count
  features: product?.features || [],
  images: product?.images || ['/placeholder-image.jpg']
};

  const handleAddToBasket = () => {
    dispatch(addToBasket({
      id: safeProduct._id,
      title: safeProduct.name,
      image: safeProduct.images[0],
      price: safeProduct.price,
      rating: safeProduct.rating,
      quantity
    }));

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleQuantityChange = (e) => {
    const value = Math.min(MAX_QUANTITY, Math.max(1, Number(e.target.value) || 1));
    setQuantity(value);
  };

  if (loading) return (
    <div className="product product--loading">
      <div className="product__skeleton-image" />
      <div className="product__skeleton-text" />
      <div className="product__skeleton-button" />
    </div>
  );

  if (error) return <div className="product product--error">Error: {error}</div>;
  if (!product) return <div className="product product--not-found">Product not found</div>;

  return (
    <motion.div 
      className="product"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        boxShadow: isAnimating ? '0 0 15px rgba(240, 193, 75, 0.5)' : 'none'
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >

      <div className="product__info">
        <h3 className="product__title">{safeProduct.name}</h3>
        
        <p className="product__price">
          <small>$</small>
          <strong>{safeProduct.price.toFixed(2)}</strong>
          {safeProduct.discount > 0 && (
            <span className="product__discount">
              {safeProduct.discount}% off
            </span>
          )}
        </p>

        <div className="product__rating" aria-label={`Rating: ${safeProduct.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>
              {i < Math.floor(safeProduct.rating) ? '⭐' : i < safeProduct.rating ? '✨' : '☆'}
            </span>
          ))}
          <span className="rating-text">({safeProduct.rating})</span>
          <span className="review-count">({safeProduct.reviews} reviews)</span>
        </div>

        {safeProduct.features.length > 0 && (
          <ul className="product__features">
            {safeProduct.features.slice(0, 3).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
      </div>

      <motion.img 
        src={safeProduct.images[0]} 
        alt={safeProduct.name}
        className="product__image"
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      />

      {!isAdded && (
        <div className="product__quantity-controls">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            max={MAX_QUANTITY}
            value={quantity}
            onChange={handleQuantityChange}
            aria-label="Product quantity"
          />
          <button 
            onClick={() => setQuantity(q => Math.min(MAX_QUANTITY, q + 1))}
            disabled={quantity >= MAX_QUANTITY}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      )}

      <motion.button
        onClick={handleAddToBasket}
        className={`product__button ${isAdded ? 'product__button--added' : ''}`}
        whileHover={!isAdded ? { scale: 1.05 } : {}}
        whileTap={!isAdded ? { scale: 0.95 } : {}}
        disabled={isAdded}
      >
        {isAdded ? (
          <>
            <span className="product__checkmark">✓</span> Added to Cart
          </>
        ) : (
          `Add ${quantity > 1 ? `${quantity} to Cart` : 'to Cart'}`
        )}
      </motion.button>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="product__notification"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SingleProduct;