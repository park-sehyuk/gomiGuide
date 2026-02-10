import "./ReslutCategory.css";

const ResultCategory = ({ filteredItem }) => {
  return (
    <div className="Category">
      <img src={filteredItem[0].iconUrl} alt={filteredItem[0].categoryKo} />
      <p>
        {filteredItem[0].categoryKo}({filteredItem[0].categoryJp})
      </p>
    </div>
  );
};

export default ResultCategory;
