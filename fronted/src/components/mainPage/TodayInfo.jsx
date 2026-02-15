import "./TodayInfo.css";

const TodayInfo = ({toDays, selectedArea}) => {
  return (
    <div className="TodayInfo">
        <h2>{selectedArea.areaNameKo}</h2>
        {toDays.length === 0 ? <div>
            <p>쓰레기를 버릴 수 있는 날이 아닙니다!!</p>
        </div> :
            toDays.map(toDay => <div>
                <img src={toDay.iconUrl} alt={toDay.categoryNameKo} />
                <p>{toDay.categoryNameKo} 버리는 날입니다!!</p>
            </div>)
        }
    </div>
  );
};

export default TodayInfo;
