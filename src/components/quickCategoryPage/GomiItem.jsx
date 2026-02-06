import { Link } from "react-router-dom";

import "./GomiItem.css";

const GomiItem = ({ gomi }) => {
  return (
    <div className="GomiItem">
      <Link to={`/detail/${gomi.id}`}>
        <div className="ItemInfo">
          <img src={gomi.iconUrl} alt={gomi.categoryKo} />
          <div className="ItemText">
            <h2>
              {gomi.nameKo}({gomi.nameJp})
            </h2>
            <h3>
              {gomi.categoryKo}({gomi.categoryJp})
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GomiItem;
