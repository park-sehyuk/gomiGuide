import "./OfficialLink.css";

const OfficialLink = ({ filteredItem }) => {
  return (
    <div className="Official">
      <a href={filteredItem[0].officialLink}>공식 안내 링크(click)</a>
    </div>
  );
};

export default OfficialLink;
