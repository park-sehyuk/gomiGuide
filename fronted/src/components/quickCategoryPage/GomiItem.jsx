import { Link } from "react-router-dom";

import "./GomiItem.css";

const GomiItem = ({ gomi }) => {
  return (
    <div className="GomiItem">
      <Link to={`/detail/${gomi.itemId}`}>
        <div className="ItemInfo">
          <img src={gomi.iconUrl} alt={gomi.categoryNameKo} />
          <div className="ItemText">
            <h2>
              {gomi.nameKo}({gomi.nameJp})
            </h2>
            <h3>
              {gomi.categoryNameKo}({gomi.categoryNameJp})
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GomiItem;
