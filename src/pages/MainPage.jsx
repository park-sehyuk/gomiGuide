import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="Main">
      <div className="GomiSearch">
        <input
          type="text"
          placeholder="무엇을 버리시나요?(예: 우산, 건전지등)"
        />
        <button>검색</button>
      </div>
      <div className="RegionSelect">
        <h2>지역 선택</h2>
      </div>
      <div className="Infos">
        <div className="TodayInfo">
          <h2>오늘의 배출 정보 (Today)</h2>
          <div>
            <img src="" alt="" />
            <p>가연성 쓰레기 버리는 날입니다!!</p>
          </div>
        </div>
        <div className="WeekInfo">
          <h2>주간 일정 (Weekly)</h2>
          <div className="Weekly">
            <ul>
              <li>
                <p>월</p>
              </li>
              <li>
                <p>화</p>
              </li>
              <li>
                <p>수</p>
              </li>
              <li>
                <p>목</p>
              </li>
              <li>
                <p>금</p>
              </li>
              <li>
                <p>토</p>
              </li>
              <li>
                <p>일</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="QuickCategory">
        <h2>퀵 메뉴 (Category)</h2>
        <div className="CategoryList">
          <div className="item">
            <a href="">
              <img src="" alt="" />
              <p>가연성</p>
            </a>
          </div>
          <div className="item">
            <a href="">
              <img src="" alt="" />
              <p>불연성</p>
            </a>
          </div>
          <div className="item">
            <a href="">
              <img src="" alt="" />
              <p>자원류</p>
            </a>
          </div>
          <div className="item">
            <a href="">
              <img src="" alt="" />
              <p>가전</p>
            </a>
          </div>
          <div className="item">
            <a href="">
              <img src="" alt="" />
              <p>대형</p>
            </a>
          </div>
          <div className="item">
            <a href="">
              <img src="" alt="" />
              <p>유해</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
