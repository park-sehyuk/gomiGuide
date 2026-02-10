import "./WeekInfo.css";

const WeekInfo = ({ weekInfo }) => {
  return (
    <div className="WeekInfo">
      <ul>
        {weekInfo.map((dayInfo) => (
          <li key={dayInfo.id}>
            <p>{dayInfo.name}</p>
            <img src={dayInfo.imgUrl} alt={dayInfo.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekInfo;
