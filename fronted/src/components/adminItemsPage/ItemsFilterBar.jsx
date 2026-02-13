import "./ItemsFilterBar.css";

const ItemsFilterBar = ({
  query,
  setQuery,
  category,
  setCategory,
  categories,
  sortKey,
  setSortKey,
  sortDir,
  toggleSortDir,
}) => {
  return (
    <div className="FilterBar">
      <input
        className="SearchInput"
        placeholder="품목 검색 (한국어/일본어)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select
        className="Select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === "all" ? "전체 카테고리" : c}
          </option>
        ))}
      </select>

      <select
        className="Select"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
      >
        <option value="nameKo">이름(ko)</option>
        <option value="categoryNameKo">카테고리</option>
      </select>

      <button className="GhostBtn" onClick={toggleSortDir} title="정렬 방향">
        {sortDir === "asc" ? "오름차순" : "내림차순"}
      </button>
    </div>
  );
};

export default ItemsFilterBar;
