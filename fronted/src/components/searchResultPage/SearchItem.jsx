import { Link } from "react-router-dom";
import "./SearchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="SearchItemPage">
      <Link to={`/detail/${item.itemId}`}>
        <div className="ItemInfo">
          <img src={item.iconUrl} alt={item.categoryNameKo} />
          <div className="ItemText">
            <h2>
              {item.nameKo}({item.nameJp})
            </h2>
            <h3>
              {item.categoryNameKo}({item.categoryNameJp})
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchItem;
