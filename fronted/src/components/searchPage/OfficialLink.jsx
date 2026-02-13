import "./OfficialLink.css";

const OfficialLink = ({ item }) => {
  return (
    <div className="Official">
      <a href={item.officialUrl}>공식 안내 링크(click)</a>
    </div>
  );
};

export default OfficialLink;
