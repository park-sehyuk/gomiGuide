import "./LogsFilterBar.css";

const LogsFilterBar = ({
  query,
  setQuery,
  level,
  setLevel,
  type,
  setType,
  from,
  setFrom,
  to,
  setTo,
  onReset,
}) => {
  return (
    <div className="FilterBar">
      <input
        className="SearchInput"
        placeholder="검색 (예: 신주쿠, 플라스틱, 404)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select
        className="Select"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="all">전체 유형</option>
        <option value="search">검색</option>
        <option value="click">클릭</option>
        <option value="admin">관리자 작업</option>
        <option value="error">에러</option>
      </select>

      <select
        className="Select"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="all">전체 레벨</option>
        <option value="info">INFO</option>
        <option value="warn">WARN</option>
        <option value="error">ERROR</option>
      </select>

      <div className="DateRange">
        <div className="DateBox">
          <span className="DateLabel">From</span>
          <input
            className="DateInput"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="DateBox">
          <span className="DateLabel">To</span>
          <input
            className="DateInput"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      <button className="GhostBtn" onClick={onReset} type="button">
        초기화
      </button>
    </div>
  );
};

export default LogsFilterBar;
