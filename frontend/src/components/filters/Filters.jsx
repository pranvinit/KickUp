import { useState, useEffect, useContext } from "react";
import { QueryContext } from "../../context/query/QueryContext";
import "./filters.scss";

// action creaters
import { ApplyFilters, ResetFilters } from "../../context/query/QueryActions";

const INITIAL_STATE = {
  prices: [],
  colors: [],
  designTemplates: [],
  types: [],
};

const Filters = () => {
  const [filters, setFilters] = useState(INITIAL_STATE);
  const { query, dispatch } = useContext(QueryContext);

  const getColorByIndex = (i) => {
    switch (i) {
      case 0:
        return "red";
      case 1:
        return "blue";
      case 2:
        return "yellow";
      case 3:
        return "green";
      case 4:
        return "purple";
      default:
        break;
    }
  };

  const handleFilters = () => {
    const { search, ...rest } = query;
    if (JSON.stringify(filters) === JSON.stringify(rest)) return;
    dispatch(ApplyFilters(filters));
  };

  // const handleColor = (i) => {
  //   if (filters.colors?.includes(getColorByIndex(i))) {
  //     const newColors = filters.colors.filter((c) => c !== getColorByIndex(i));
  //     setFilters((prev) => ({ ...prev, colors: newColors }));
  //   } else {
  //     setFilters((prev) => ({
  //       ...prev,
  //       colors: [...filters.colors, getColorByIndex(i)],
  //     }));
  //   }
  // };

  const handleColor = (i) => {
    const color = getColorByIndex(i);
    const isColorIncluded = filters.colors?.includes(color);

    const newColors = isColorIncluded
      ? filters.colors.filter((c) => c !== color)
      : [...(filters.colors || []), color];

    setFilters((prev) => ({ ...prev, colors: newColors }));
  };

  useEffect(() => {
    handleFilters();
  }, [filters]);

  const handleFilterCheckbox = ({ target }) => {
    const { name, value } = target;
    if (filters[name]?.includes(value)) {
      const newValues = filters[name].filter((v) => v !== value);
      setFilters((prev) => ({ ...prev, [name]: newValues }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: [...filters[name], value] }));
    }
    handleFilters();
  };

  const handleReset = () => {
    setFilters(INITIAL_STATE);
    dispatch(ResetFilters({}));
  };

  return (
    <div className="filters">
      <form className="wrapper" onSubmit={handleFilters}>
        <div className="top">
          <h2>Filters</h2>
          <img src="/assets/filter.png" alt="filter" />
        </div>
        <div className="cost">
          <h2>Cost</h2>
          <div className="field">
            <input
              type="checkbox"
              id="p1"
              value="1500-4000"
              name="prices"
              onChange={handleFilterCheckbox}
            />
            <label htmlFor="p1">Rs. 1500-4000</label>
          </div>
          <div className="field">
            <input
              type="checkbox"
              id="p2"
              value="4001-7000"
              name="prices"
              onChange={handleFilterCheckbox}
            />
            <label htmlFor="p2">Rs. 4001-7000</label>
          </div>
          <div className="field">
            <input
              type="checkbox"
              id="p3"
              value="7001-99999"
              name="prices"
              onChange={handleFilterCheckbox}
            />
            <label htmlFor="p3">Rs. 7001+</label>
          </div>
        </div>
        <div className="color">
          <h2>Color</h2>
          <div className="container">
            {Array(5)
              .fill()
              .map((_, i) => (
                <span
                  key={i}
                  className={
                    filters.colors?.includes(getColorByIndex(i))
                      ? "active"
                      : null
                  }
                  onClick={() => handleColor(i)}
                ></span>
              ))}
          </div>
        </div>
        <div className="designTemplates">
          <h2>Design Templates</h2>
          <div className="field">
            <input
              type="checkbox"
              value={2}
              onChange={handleFilterCheckbox}
              name="designTemplates"
              id="dt1"
            />
            <label htmlFor="dt1">2</label>
          </div>
          <div className="field">
            <input
              type="checkbox"
              value={3}
              onChange={handleFilterCheckbox}
              name="designTemplates"
              id="dt2"
            />
            <label htmlFor="dt2">3</label>
          </div>
          <div className="field">
            <input
              type="checkbox"
              value={4}
              onChange={handleFilterCheckbox}
              name="designTemplates"
              id="dt3"
            />
            <label htmlFor="dt3">3+</label>
          </div>
        </div>
        <div className="type">
          <h2>Type</h2>
          <div className="field">
            <input
              type="checkbox"
              id="t1"
              value="loafers"
              onChange={handleFilterCheckbox}
              name="types"
            />
            <label htmlFor="t1">Loafers</label>
          </div>
          <div className="field">
            <input
              type="checkbox"
              id="t2"
              value="sneakers"
              onChange={handleFilterCheckbox}
              name="types"
            />
            <label htmlFor="t2">Sneakers</label>
          </div>
        </div>

        <button onClick={handleReset} type="reset">
          Reset
        </button>
      </form>
    </div>
  );
};

export default Filters;
