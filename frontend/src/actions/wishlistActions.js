import Axios from 'axios';
import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM, 
  WISHLIST_ADD_ITEM_FAIL,
} from '../constants/wishlistConstants';

export const addToWishlist = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  const {
    wishlist: { wishlistItems },
  } = getState();
  if (wishlistItems.length > 0 && data.seller._id !== wishlistItems[0].seller._id) {
    dispatch({
      type: WISHLIST_ADD_ITEM_FAIL,
      payload: `Can't Add To Wishlist. Buy only from ${wishlistItems[0].seller.seller.name} in this order`,
    });
  } else {
    dispatch({
      type: WISHLIST_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      },
    });
    localStorage.setItem(
      'wishlistItems',
      JSON.stringify(getState().wishlist.wishlistItems)
    );
  }
};

export const removeFromWishlist = (productId) => (dispatch, getState) => {
  dispatch({ type: WISHLIST_REMOVE_ITEM, payload: productId });
  localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
};


