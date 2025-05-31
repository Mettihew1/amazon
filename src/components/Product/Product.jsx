import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addToBasket, selectBasketItems } from "../../store/slices/basketSlice";
import './Product.css';

function Product({ id, title, image, price, rating }) {
  const dispatch = useDispatch();
  const basketItems = useSelector(selectBasketItems);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const MAX_QUANTITY = 10;

  // Check if product is already in basket
  useEffect(() => {
    const existingItem = basketItems.find(item => item.id === id);
    setIsAdded(!!existingItem);
    if (existingItem) setQuantity(existingItem.quantity);
  }, [basketItems, id]);

  const handleAddToBasket = () => {
    dispatch(addToBasket({
      id,
      title,
      image,
      price,
      rating,
      quantity
    }));

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleQuantityChange = (e) => {
    const value = Math.min(MAX_QUANTITY, Math.max(1, Number(e.target.value) || 1));
    setQuantity(value);
  };

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
        <h3 className="product__title">{title}</h3>
        
        <p className="product__price">
          <small>$</small>
          <strong>{price.toFixed(2)}</strong>
        </p>

        <div className="product__rating" aria-label={`Rating: ${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>
              {i < Math.floor(rating) ? '⭐' : i < rating ? '✨' : '☆'}
            </span>
          ))}
          <span className="rating-text">({rating})</span>
        </div>
      </div>

      <motion.img 
        src={image} 
        alt={title}
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

export default Product;