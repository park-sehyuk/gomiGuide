import { Link } from "react-router-dom";
import "./SearchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="SearchItemPage">
      <Link to={`/detail/${item.id}`}>
        <div className="ItemInfo">
          <img src={item.iconUrl} alt={item.categoryKo} />
          <div className="ItemText">
            <h2>
              {item.nameKo}({item.nameJp})
            </h2>
            <h3>
              {item.categoryKo}({item.categoryJp})
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchItem;
