import "./rating.scss";
import { useState, useContext, useEffect } from "react";
import RatingComponent from "react-rating";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth/AuthContext";

const Rating = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(null);

  const [hasRated, setHasRated] = useState({ rated: false, value: null });

  const getCurrentUser = async () => {
    const res = await axios.get(`/api/users/${user.userId}`);
    res.data.user.reviews.forEach((review) => {
      if (review.product === id) {
        setHasRated({ rated: true, value: review.rating });
      }
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleRating = async () => {
    try {
      await axios.post(`/api/reviews/${id}`, { rating });
      setHasRated({ rated: true, value: rating });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="rating">
      <span>{!hasRated.rated ? "Rate Product" : "Rated"}</span>
      <RatingComponent
        readonly={hasRated.rated}
        initialRating={hasRated.rated ? hasRated.value : rating || undefined}
        onChange={(rate) => setRating(rate)}
        emptySymbol={
          <img src="/assets/star-empty.png" alt="star empty" className="star" />
        }
        fullSymbol={
          <img src="/assets/star-fill.png" alt="star fill" className="star" />
        }
      />
      {!!rating && !hasRated.rated && (
        <div>
          <button onClick={handleRating} disabled={!rating}>
            submit
          </button>
          <button className="reset" onClick={() => setRating(null)}>
            reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Rating;
