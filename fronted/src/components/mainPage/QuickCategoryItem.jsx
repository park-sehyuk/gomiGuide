import { Link } from "react-router-dom";
import "./QuickCategoryItem.css";

const QuickCategoryItme = ({ categoryItem }) => {
  return (
    <div className="QuickCategoryItem">
      <Link to={`/quickCategory/${categoryItem.name}`}>
        <img src={categoryItem.iconUrl} alt={categoryItem.name} />
        <p>{categoryItem.name}</p>
      </Link>
    </div>
  );
};

export default QuickCategoryItme;
