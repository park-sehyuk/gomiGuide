import "./CategoryInfo.css";

const CategoryInfo = ({ category }) => {
  return (
    <div className="category">
      <img src={category[0].iconUrl} alt={category[0].categoryNameKo} />
      <h1>{category[0].categoryNameKo}</h1>
    </div>
  );
};

export default CategoryInfo;
