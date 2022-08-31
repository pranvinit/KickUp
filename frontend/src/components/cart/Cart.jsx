import "./cart.scss";
import { useState } from "react";

// mock data import
import { ITEMS } from "../../mockData";

const Cart = () => {
  const [cartItems, setCartItems] = useState(ITEMS);

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
                  <img src={item.images[0]} alt={item.name} />{" "}
                  <img src="/assets/cancel.png" alt="cancel" />
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
          <button>Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
