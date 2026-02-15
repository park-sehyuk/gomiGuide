import "./WeekInfo.css";

const WeekInfo = ({ weekInfo }) => {
  return (
    <div className="WeekInfo">
      <ul>
        {weekInfo.map((dayInfo) => (
          <li key={dayInfo.ruleId}>
            <p>{dayInfo.dayOfWeek}</p>
            <img src={dayInfo.iconUrl} alt={dayInfo.categoryNameKo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekInfo;
