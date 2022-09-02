import "./cart.scss";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "react-spinner-material";

// import { ITEMS } from "../../mockData";

const Cart = forwardRef((props, ref) => {
  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products/cart");
      setCartItems(res.data.products || []);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  useImperativeHandle(ref, () => ({ fetchCartItems }));

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    try {
      const res = await axios.delete("/api/products/cart", { data: { id } });
      toast.success(res.data.message);
      fetchCartItems();
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const handleOrder = async () => {
    try {
      const res = await axios.post("/api/orders/checkout");
      fetchCartItems();
      toast.success(res.data.message);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="cart">
        <div className="wrapper wrapper-loader">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="wrapper">
        <div className="top">
          <h2>Cart</h2>
          <img src="/assets/bag.png" alt="bag" />
        </div>
        <div className="center">
          {!!cartItems.length &&
            cartItems.map((item) => (
              <div className="cartItem" key={item.product_id}>
                <div className="imgWrapper">
                  <img src={item.images[1]} alt={item.name} />{" "}
                  <img
                    onClick={() => handleRemove(item.product_id)}
                    src="/assets/cancel.png"
                    alt="cancel"
                  />
                </div>
                <div className="right">
                  <h3>{item.name}</h3>
                  <span>{item.seller_name}</span>

                  <h3>{item.price}</h3>
                </div>
              </div>
            ))}
          {!cartItems.length && <span>What's stopping you, designer?</span>}
        </div>
        <div className="bottom">
          <div className="details">
            <div className="info">
              <img src="/assets/pin.png" alt="pin" />
              <span>Home</span>
            </div>
            <div className="info">
              <img src="/assets/calendar.png" alt="calendar" />
              <span>Select date</span>
            </div>
          </div>
          <button disabled={!cartItems.length} onClick={handleOrder}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
});

export default Cart;
