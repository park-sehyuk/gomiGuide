import "./QuickCategoryItem.css";

const QuickCategoryItme = ({ categoryItem }) => {
  return (
    <div className="QuickCategoryItem">
      <a href="">
        <img src={categoryItem.iconUrl} alt={categoryItem.name} />
        <p>{categoryItem.name}</p>
      </a>
    </div>
  );
};

export default QuickCategoryItme;
