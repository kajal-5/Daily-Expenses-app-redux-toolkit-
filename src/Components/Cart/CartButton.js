import { useDispatch } from 'react-redux';
import { toggleCart } from '../../store/cart';
import { useSelector } from 'react-redux';

const CartButton = () => {
  
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(toggleCart())}>Cart({cartItems.length})</button>;

};

export default CartButton;
