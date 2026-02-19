import "./RecentActivity.css";

const RecentActivity = ({ recentCreated, recentUpdated }) => {
  const created = Array.isArray(recentCreated) ? recentCreated : [];
  const updated = Array.isArray(recentUpdated) ? recentUpdated : [];

  const renderItem = (item) => {
    const name = item?.nameKo || item?.nameJp || "이름 없음";
    const category = item?.categoryNameKo ? ` · ${item.categoryNameKo}` : "";
    return `${name}${category}`;
  };

  return (
    <div className="Recent">
      <div className="RecentSection">
        <h3>최근 등록</h3>
        <ul>
          {created.length === 0 ? (
            <li className="Empty">데이터가 없습니다.</li>
          ) : (
            created.map((item) => (
              <li key={`created-${item.itemId}`}>{renderItem(item)}</li>
            ))
          )}
        </ul>
      </div>
      <div className="RecentSection">
        <h3>최근 수정</h3>
        <ul>
          {updated.length === 0 ? (
            <li className="Empty">데이터가 없습니다.</li>
          ) : (
            updated.map((item) => (
              <li key={`updated-${item.itemId}`}>{renderItem(item)}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
