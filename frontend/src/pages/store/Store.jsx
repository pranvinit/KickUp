import "./store.scss";
// Components imports
import Filters from "../../components/filters/Filters";
import List from "../../components/list/List";
import Cart from "../../components/cart/Cart";

const Store = () => {
  return (
    <div className="store">
      <Filters />
      <List />
      <Cart />
    </div>
  );
};

export default Store;
