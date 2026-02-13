import { Link } from "react-router-dom";
import "./QuickCategoryItem.css";

const QuickCategoryItme = ({ categoryItem }) => {
  return (
    <div className="QuickCategoryItem">
      <Link to={`/quickCategory/${categoryItem.nameKo}`}>
        <img src={categoryItem.iconUrl} alt={categoryItem.nameKo} />
        <p>{categoryItem.nameKo}</p>
      </Link>
    </div>
  );
};

export default QuickCategoryItme;
