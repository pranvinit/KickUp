import "./filters.scss";

const Filters = () => {
  const handleColor = (i) => {
    console.log(i);
  };

  return (
    <div className="filters">
      <div className="wrapper">
        <div className="top">
          <h2>Filters</h2>
          <img src="/assets/filter.png" alt="filter" />
        </div>
        <div className="cost">
          <h2>Cost</h2>
          <div className="field">
            <input type="checkbox" id="p1" />
            <label htmlFor="p1">Rs. 1500-4000</label>
          </div>
          <div className="field">
            <input type="checkbox" id="p2" />
            <label htmlFor="p2">Rs. 4001-7000</label>
          </div>
          <div className="field">
            <input type="checkbox" id="p3" />
            <label htmlFor="p3">Rs. 7001+</label>
          </div>
        </div>
        <div className="color">
          <h2>Color</h2>
          <div className="container">
            {Array(5)
              .fill()
              .map((i) => (
                <span key={i} onClick={() => handleColor(i)}></span>
              ))}
          </div>
        </div>
        <div className="designTemplates">
          <h2>Design Templates</h2>
          <div className="field">
            <input type="checkbox" id="dt1" />
            <label htmlFor="dt1">2</label>
          </div>
          <div className="field">
            <input type="checkbox" id="dt2" />
            <label htmlFor="dt2">3</label>
          </div>
          <div className="field">
            <input type="checkbox" id="dt3" />
            <label htmlFor="dt3">3+</label>
          </div>
        </div>
        <div className="type">
          <h2>Type</h2>
          <div className="field">
            <input type="checkbox" id="t1" />
            <label htmlFor="t1">Loafers</label>
          </div>
          <div className="field">
            <input type="checkbox" id="t2" />
            <label htmlFor="t2">Sneakers</label>
          </div>
        </div>

        <button>Apply</button>
      </div>
    </div>
  );
};

export default Filters;
