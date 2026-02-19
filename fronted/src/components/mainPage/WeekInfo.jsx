import "./WeekInfo.css";

const WeekInfo = ({ weekInfo }) => {
  return (
    <div className="WeekInfo">
      <ul>
        {weekInfo.map((dayInfo, idx) => (
          <li key={dayInfo.ruleId ?? `day-${idx}`}>
            <p>{dayInfo.dayOfWeek}</p>
            {dayInfo.iconUrl ? (
              <img src={dayInfo.iconUrl} alt={dayInfo.categoryNameKo ?? ""} />
            ) : (
              <div className="IconPlaceholder" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekInfo;
