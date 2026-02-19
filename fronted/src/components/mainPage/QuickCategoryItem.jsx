import { Link } from "react-router-dom";
import "./QuickCategoryItem.css";

const QuickCategoryItme = ({ categoryItem }) => {
  if (!categoryItem) return null;
  return (
    <div className="QuickCategoryItem">
      <Link to={`/quickCategory/${encodeURIComponent(categoryItem.nameKo ?? "")}`}>
        {categoryItem.iconUrl ? (
          <img src={categoryItem.iconUrl} alt={categoryItem.nameKo ?? ""} />
        ) : (
          <div className="IconPlaceholder" />
        )}
        <p>{categoryItem.nameKo ?? "-"}</p>
      </Link>
    </div>
  );
};

export default QuickCategoryItme;
