import "./TodayInfo.css";

const TodayInfo = ({toDays, selectedArea}) => {
  return (
    <div className="TodayInfo">
        <h2>{selectedArea}</h2>
        {toDays.length === 0 ? (
          <div>
            <p>쓰레기를 버릴 수 있는 날이 아닙니다!!</p>
          </div>
        ) : (
          toDays.map((toDay, idx) => (
            <div key={`${toDay.ruleId ?? "day"}-${idx}`}>
              {toDay.iconUrl ? (
                <img src={toDay.iconUrl} alt={toDay.categoryNameKo ?? ""} />
              ) : (
                <div className="IconPlaceholder" />
              )}
              <p>{toDay.categoryNameKo ?? "-"} 버리는 날입니다!!</p>
            </div>
          ))
        )}
    </div>
  );
};

export default TodayInfo;
