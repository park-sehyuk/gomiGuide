import "./LogsHeader.css";

const LogsHeader = ({ total, onExport }) => {
  return (
    <div className="AdminLogsHeader">
      <div>
        <h1 className="Title">로그</h1>
        <p className="Sub">
          검색/클릭/관리자 변경/에러 기록을 확인합니다. (총 {total}건)
        </p>
      </div>

      <button className="PrimaryBtn" onClick={onExport} type="button">
        내보내기 (CSV)
      </button>
    </div>
  );
};

export default LogsHeader;
