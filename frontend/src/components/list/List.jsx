import "./list.scss";
import { useState, useEffect } from "react";
import Item from "../item/Item";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "react-spinner-material";

// importing mock data
// import { ITEMS } from "../../mockData";
import { Link } from "react-router-dom";

const List = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products");
      setData(res.data.products);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = async () => {};

  if (loading) {
    return (
      <div className="list">
        <div className="wrapper wrapper-loader">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="list">
      <div className="wrapper">
        <div className="top">
          <h2>Shoes</h2>
          <div className="topright">
            <div className="search">
              {searchActive && (
                <input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search..."
                />
              )}
              <div
                className={`${
                  searchActive
                    ? "searchIconWrapper active"
                    : "searchIconWrapper"
                }`}
              >
                <img
                  src="/assets/search.png"
                  alt="search"
                  onClick={() => setSearchActive(!searchActive)}
                />
              </div>
            </div>
            <div className="sort">Sort By</div>
          </div>
        </div>
        <div className="items">
          {data.map((item) => (
            <Link className="link-reset" to={`/store/${item.product_id}`}>
              <Item item={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
