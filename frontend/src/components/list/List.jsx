import "./list.scss";
import { useState, useEffect, useContext } from "react";
import Item from "../item/Item";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "react-spinner-material";

// importing mock data
// import { ITEMS } from "../../mockData";
import { Link } from "react-router-dom";
import { QueryContext } from "../../context/query/QueryContext";
import {
  ApplySearch,
  ResetSearch,
  ApplySort,
  ResetSort,
} from "../../context/query/QueryActions";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState(0);
  const [sortActive, setSortActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchQuery = () => {
    if (!searchQuery) return dispatch(ResetSearch());
    dispatch(ApplySearch(searchQuery));
  };

  const getSortValue = () => {
    switch (sort) {
      case 0:
        return null;
      case 1:
        return ["price", "ASC"];
      case 2:
        return ["price", "DESC"];
      default:
        return 0;
    }
  };

  const handleSort = () => {
    const value = getSortValue();

    if (!value) return dispatch(ResetSort());
    dispatch(ApplySort(value));
  };

  const { query, dispatch } = useContext(QueryContext);

  const fetchItems = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/products", { params: query });
      setData(res.data.products);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    handleSearchQuery();
  }, [searchQuery]);

  useEffect(() => {
    handleSort();
  }, [sort]);

  useEffect(() => {
    fetchItems();
  }, [query]);

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
                  value={searchQuery}
                  onChange={({ target }) => setSearchQuery(target.value)}
                  placeholder="Search..."
                  autoFocus
                />
              )}
              <div className="searchIconWrapper">
                <img
                  src={
                    !searchActive ? "/assets/search.png" : "/assets/close.png"
                  }
                  alt="search"
                  className={searchActive ? "close" : null}
                  onClick={() => {
                    setSearchQuery("");
                    setSearchActive(!searchActive);
                  }}
                />
              </div>
            </div>
            <div
              onClick={() => setSortActive(!sortActive)}
              className={!sortActive ? "sort" : "sort active"}
            >
              <span>Sort By</span>
              {sortActive && (
                <div className="sortFields">
                  <span
                    className={!sort ? "field active" : "field"}
                    onClick={() => setSort(0)}
                  >
                    Default
                  </span>
                  <span
                    className={sort === 1 ? "field active" : "field"}
                    onClick={() => setSort(1)}
                  >
                    Price (Low to High)
                  </span>
                  <span
                    className={sort === 2 ? "field active" : "field"}
                    onClick={() => setSort(2)}
                  >
                    Price (High to Low)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {!!data.length && (
          <div className="items">
            {data.map((item) => (
              <Link
                key={item.product_id}
                className="link-reset"
                to={`/store/${item.product_id}`}
              >
                <Item item={item} />
              </Link>
            ))}
          </div>
        )}

        {!data.length && (
          <div className=" wrapper-loader">
            <h3>No matching items found.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
