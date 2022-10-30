import React ,{useState}from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  const [qty, setQty] = useState(1);
  const  [toggleHeart, setToggleHeart] = useState(false)
  let audio = new Audio("/audio.mp3")

  const addToCartHandler = () => {    
    
    navigate(`/cart/${product._id}?qty=${qty}`);
  };
  const addToWishlistHandler = () => {
    setToggleHeart(true)
    navigate(`/wishlist/${product._id}?qty=${qty}`); 
  };

  const removeFromWishlistHandler = () => {
    setToggleHeart(false)
      
  }

  const handleAudio = () =>{
    audio.play()
  }

  const navigate = useNavigate();
  return (
    <div key={product._id} className="card" style={{position:"relative"}}>
      {product.discountedPrice >0 && (<>
      
      <div style={{position:"absolute",right:"30px"}}>|</div>
      <div 
      style={{fontSize:"14px",fontWeight:"550",top:"18px",width:"18%",height:"4%",color:"#ffff",right:"5px",transform:"rotate(90deg)",position:"absolute",marginTop:"10px",background:"#2ac1b5"}}>
        &nbsp;&nbsp;
        New</div>     
      
      </>)}
      {/* <div style={{position:"absolute",left:"10px"}}>&#10084; */}
      
      <button
        onClick={addToWishlistHandler}      
       
        style={{position:"absolute",left:"0px",background:"#ffffff00",outline:"none",border:"none"}}
      >
        {/* &#10084; */}
        <i class="fa fa-heart-o" style={{color:"green",fontWeight:"1000",fontSize:"18px"}}></i>
      </button>
      
      
      {/* </div> */}
      
      <Link to={`/product/${product._id}`}>
        <img className="medium"  src={product.image} alt={product.name} />
        
      </Link>
      
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        
        {/* <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating> */}
        {/* <div className="row"> */}
          
          {/* <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
            </Link>
          </div> */}
          {product.countInStock > 0 && (
                    <>
                    
                        <div className="row">
                          {product.discountedPrice >0 && (<>
                            <div className="price">&#8377;<s>{product.price} </s> &nbsp;
                                <span style={{color:"#07a734"}}>
                                &#8377;{product.discountedPrice}
                                </span>
                            </div>
                          
                          
                          </>)}
                          {product.discountedPrice <=0 && (
                                <div className="price">&#8377;{product.price}</div>
                          )}
                          
                          
                          {/* <div style={{borderRight:"30%"}}>Quantity</div> */}
                          <div>
                            {/* Qty&nbsp;&nbsp; */}
                            {product.stockType} &nbsp;
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                            </div>
                        </div>
                      
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                          style={{paddingTop:"5px"}}
                        >
                          Add to Cart
                        </button>

                        {/* <button
                          onClick={addToWishlistHandler}
                          className="primary block"
                          style={{paddingTop:"5px"}}
                        >
                          Add to Wishlist
                        </button> */}
                      
                    </>
                  )}
        {/* </div> */}

      </div>
    </div>
  );
}
