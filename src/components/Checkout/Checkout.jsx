import './Checkout.css';
import Subtotal from './Subtotal';
// import { useStateValue } from '../../StateProvider';
import {useSelector, useDispatch} from 'react-redux'
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
  const basket = useSelector(state => state.basket.items)
  const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();


  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>

          {basket.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;