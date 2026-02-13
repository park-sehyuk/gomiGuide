import "./ReslutCategory.css";

const ResultCategory = ({ item }) => {
  return (
    <div className="Category">
      <img src={item.iconUrl} alt={item.categoryNameKo} />
      <p>
        {item.categoryNameKo}({item.categoryNameJp})
      </p>
    </div>
  );
};

export default ResultCategory;
