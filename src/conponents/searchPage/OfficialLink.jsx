import "./OfficialLink.css";

const OfficialLink = ({ filteredMethod }) => {
  return (
    <div className="Official">
      <a href={filteredMethod[0].officialLink}>공식 안내 링크(click)</a>
    </div>
  );
};

export default OfficialLink;
