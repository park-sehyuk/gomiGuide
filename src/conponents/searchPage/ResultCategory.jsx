import "./ReslutCategory.css";

const ResultCategory = ({ filteredMethod }) => {
  return (
    <div className="Category">
      <img src={filteredMethod[0].iconUrl} alt={filteredMethod[0].categoryKo} />
      <p>
        {filteredMethod[0].categoryKo}({filteredMethod[0].categoryJp})
      </p>
    </div>
  );
};

export default ResultCategory;
