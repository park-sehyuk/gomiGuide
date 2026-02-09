import "./ItemsHeader.css";

const ItemsHeader = ({ total, onCreate }) => {
  return (
    <div className="AdminItemsHeader">
      <div>
        <h1 className="Title">품목 관리</h1>
        <p className="Sub">
          도쿄 분리배출 품목 정보를 관리합니다. (총 {total}건)
        </p>
      </div>

      <button className="PrimaryBtn" onClick={onCreate}>
        + 새 품목 등록
      </button>
    </div>
  );
};

export default ItemsHeader;
