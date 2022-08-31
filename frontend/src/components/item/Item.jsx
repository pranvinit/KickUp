import "./item.scss";

const Item = ({ item }) => {
  console.log(item);

  return (
    <div className="item">
      <img src={item.images[0]} alt={item.name} />
      <div>
        <h2 className="center">{item.name}</h2>
        <div className="bottom">
          <span>Rs. {item.price}/-</span>
          <div>
            {Array(Math.round(item.average_rating))
              .fill()
              .map((i) => (
                <img key={i} src="/assets/star.png" alt="star" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
