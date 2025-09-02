import { useSelector, useDispatch } from 'react-redux';
import { increaseCartItem, decreaseCartItem } from '../../store/cart';
import './cartlist.css';

const CartList = () => {
  const { isVisible, items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (!isVisible) return null;

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cartlist-container" data-testid="cart-container">
      <h2 data-testid="cart-title">Cart Items</h2>
      {items.map((item, index) => (
        <div className="cartlist-item" key={item._id} data-testid={`cart-item-${index}`}>
          <p data-testid={`item-${index}`}>
            {item.name} - ₹{item.price} × <span data-testid={`quantity-${index}`}>{item.quantity}</span> = ₹<span data-testid={`total-${index}`}>{item.price * item.quantity}</span>
          </p>
          <div>
            <button
              className="cartlist-btn"
              data-testid={`decrease-${index}`}
              onClick={() => dispatch(decreaseCartItem(item))}
            >
              -
            </button>
            <button
              className="cartlist-btn"
              data-testid={`increase-${index}`}
              onClick={() => dispatch(increaseCartItem(item))}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <h3 data-testid="cart-total">Total: ₹{totalPrice}</h3>
    </div>
  );
};

export default CartList;