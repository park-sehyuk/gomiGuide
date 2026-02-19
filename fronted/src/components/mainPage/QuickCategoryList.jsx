import "./QuickCategoryList.css";
import QuickCategoryItme from "./QuickCategoryItem";

const QuickCategoryList = ({ quickCategory }) => {
  const list = Array.isArray(quickCategory) ? quickCategory.filter(Boolean) : [];
  return (
    <div className="QuickCategoryList">
      {list.map((categoryItem) => (
        <QuickCategoryItme
          key={categoryItem.categoryId ?? categoryItem.code ?? categoryItem.nameKo}
          categoryItem={categoryItem}
        />
      ))}
    </div>
  );
};

export default QuickCategoryList;
