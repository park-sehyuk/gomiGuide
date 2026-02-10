import GomiItem from "./GomiItem";
import "./GomiList.css";

const GomiList = ({ gomiList }) => {
  return (
    <div className="GomiList">
      {gomiList.map((gomi) => (
        <GomiItem key={gomi.id} gomi={gomi} />
      ))}
    </div>
  );
};

export default GomiList;
