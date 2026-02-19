import "./AreasListPanel.css";

const AreasListPanel = ({
  areas,
  selectedId,
  onSelect,
  query,
  setQuery,
  type,
  setType,
}) => {
  return (
    <div className="AreasListPanel">
      <div className="PanelHeader">
        <input
          className="SearchInput"
          placeholder="지역 검색 (예: 신주쿠, 시부야)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="Select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="ward">구(区)</option>
          <option value="city">시(市)</option>
        </select>
      </div>

      <div className="AreaList">
        {areas.length === 0 ? (
          <div className="Empty">검색 결과가 없습니다.</div>
        ) : (
          areas.map((a, idx) => (
            <button
              key={`${a.id || "new"}-${idx}`}
              className={`AreaItem ${selectedId === a.id ? "Active" : ""}`}
              onClick={() => onSelect(a.id)}
              type="button"
            >
              <div className="AreaName">{a.nameKo || "새 지역"}</div>
              <div className="AreaMeta">
                <span className="Badge">
                  {a.type === "ward" ? "구(区)" : "시(市)"}
                </span>
                <span className="Muted">{a.nameJp}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default AreasListPanel;
