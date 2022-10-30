import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { addToWishlist, removeFromWishlist } from '../actions/wishlistActions';
import MessageBox from '../components/MessageBox';

export default function WishlistScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems, error } = wishlist;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToWishlist(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromWishlistHandler = (id) => {
    // delete action
    dispatch(removeFromWishlist(id));
  };

  const addToCartHandler = (id,qty) => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  
  return (
    <div className="row top" style={{backgroundColor:"#E0FFFF",padding:"6px"}}>
      <div className="col-2">
        <h1>Wishlist</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {wishlistItems.length === 0 ? (
          <MessageBox>
            Wishlist is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {wishlistItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToWishlist(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>&#8377; {item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromWishlistHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    
                    <button
                          onClick={() => addToCartHandler(item.product,item.qty)}
                          type="button"
                        >
                          Add to Cart
                        </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
  );
}
