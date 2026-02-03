import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TokyoMap,
  TodayInfo,
  WeekInfo,
  QuickCategoryList,
} from "../conponents/mainPage";
import "./MainPage.css";

const categoryData = [
  { id: 1, name: "가연성", iconUrl: "../../public/icon/가연성.png" },
  { id: 2, name: "불연성", iconUrl: "../../public/icon/불연성.png" },
  { id: 3, name: "자원류", iconUrl: "../../public/icon/자원류.png" },
  { id: 4, name: "가전", iconUrl: "../../public/icon/가전.png" },
  { id: 5, name: "대형", iconUrl: "../../public/icon/대형.png" },
  { id: 6, name: "유해", iconUrl: "../../public/icon/유해.png" },
];

const week = [
  { id: 1, name: "월", imgUrl: "../../public/icon/가연성.png" },
  { id: 2, name: "화", imgUrl: "../../public/icon/가연성.png" },
  { id: 3, name: "수", imgUrl: "../../public/icon/불연성.png" },
  { id: 4, name: "목", imgUrl: "../../public/icon/가전.png" },
  { id: 5, name: "금", imgUrl: "../../public/icon/가연성.png" },
  { id: 6, name: "토", imgUrl: "../../public/icon/대형.png" },
  { id: 7, name: "일", imgUrl: "../../public/icon/자원류.png" },
];

const MainPage = () => {
  // 검색 관리
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 지역 선택 관리
  const [selected, setSelected] = useState(null);
  // 주간 일정 관리
  const [weekInfo, setWeekInfo] = useState(week);
  // 퀵메뉴 관리
  const [quickCategory, setQuickCategory] = useState(categoryData);

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="Main">
      <div className="GomiSearch">
        <input
          type="text"
          placeholder="무엇을 버리시나요?(예: 우산, 건전지등)"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div className="RegionSelectPage">
        <div className="MapSelect">
          <p>지도를 클릭하여 거주하시는 구를 선택해주세요.</p>
          <TokyoMap selectWard={(ward) => setSelected(ward)} />
        </div>
      </div>
      <div className="Infos">
        <div className="TodayInfoPage">
          <h2>오늘의 배출 정보 (Today)</h2>
          <TodayInfo />
        </div>
        <div className="WeekInfoPage">
          <h2>주간 일정 (Weekly)</h2>
          <WeekInfo weekInfo={weekInfo} />
        </div>
      </div>
      <div className="QuickCategoryPage">
        <h2>퀵 메뉴 (Category)</h2>
        <QuickCategoryList quickCategory={quickCategory} />
      </div>
    </div>
  );
};
export default MainPage;
