import "./QuickCategoryList.css";
import QuickCategoryItme from "./QuickCategoryItem";

const QuickCategoryList = ({ quickCategory }) => {
  return (
    <div className="QuickCategoryList">
      {quickCategory.map((categoryItem) => (
        <QuickCategoryItme key={categoryItem.id} categoryItem={categoryItem} />
      ))}
    </div>
  );
};

export default QuickCategoryList;
