import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="left">
          <div className="wrapper">
            <div className="about">
              <h1>Create Your Own Styles.</h1>
              <p>
                KicksUp has an interactive online console that lets you to
                create beautiful and personalized shoe designs.
              </p>
            </div>
            <div className="links">
              <Link className="link" to="/contact">
                Learn More
              </Link>
              <Link className="link" to="/store">
                Exlore Store
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <img src="/assets/shoe.png" alt="shoe" />
        </div>
      </div>
    </div>
  );
};

export default Home;
