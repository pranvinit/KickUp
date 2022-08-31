import { useState } from "react";
import Item from "../item/Item";
import "./list.scss";

// importing mock data
import { ITEMS } from "../../mockData";
import { Link } from "react-router-dom";

const List = () => {
  const [data, setData] = useState(ITEMS);
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = async () => {};

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
