import './Subtotal.css';
import { useSelector } from 'react-redux';
import { selectBasketTotal, selectBasketItemCount } from '../../store/slices/basketSlice';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  const basketTotal = useSelector(selectBasketTotal);
  const basketItemCount = useSelector(selectBasketItemCount);
  const navigate = useNavigate();

  return (
    <div className="subtotal">
      <p>
        Subtotal ({basketItemCount} items): <strong>${basketTotal.toFixed(2)}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>

      <button onClick={() => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;