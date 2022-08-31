import "./itemView.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "../../components/cart/Cart";
import { toast } from "react-toastify";
import axios from "axios";

const ItemView = () => {
  const { id: productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  const fetchItem = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/products/${productId}`);
      setItem(res.data.product);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (loading || !item) {
    return (
      <div className="loader">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="itemView">
      <div className="itemDetails">
        <span>{item.name}</span>
        <span>{item.seller_name}</span>
        <span>{item.price}</span>
      </div>
      <Cart />
    </div>
  );
};

export default ItemView;
