import "./AreasHeader.css";

const AreasHeader = ({ total, onCreate }) => {
  return (
    <div className="AdminAreasHeader">
      <div>
        <h1 className="Title">지역 / 요일 관리</h1>
        <p className="Sub">
          도쿄 구/시별 수거 요일과 규칙을 관리합니다. (총 {total}개)
        </p>
      </div>

      <button className="PrimaryBtn" onClick={onCreate}>
        + 새 지역 등록
      </button>
    </div>
  );
};

export default AreasHeader;
