import "./CategoryInfo.css";

const CategoryInfo = ({ category }) => {
  if (!Array.isArray(category) || category.length === 0) {
    return (
      <div className="category">
        <div className="IconPlaceholder" />
        <h1>카테고리 정보 없음</h1>
      </div>
    );
  }

  const first = category[0];
  return (
    <div className="category">
      {first.iconUrl ? (
        <img src={first.iconUrl} alt={first.categoryNameKo ?? ""} />
      ) : (
        <div className="IconPlaceholder" />
      )}
      <h1>{first.categoryNameKo ?? "-"}</h1>
    </div>
  );
};

export default CategoryInfo;
