import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TokyoMap,
  TodayInfo,
  WeekInfo,
  QuickCategoryList,
} from "../conponents/mainPage";
import "./MainPage.css";

const week = [
  { id: 1, name: "월", imgUrl: "icon/burn.png" },
  { id: 2, name: "화", imgUrl: "icon/burn.png" },
  { id: 3, name: "수", imgUrl: "icon/non-burn.png" },
  { id: 4, name: "목", imgUrl: "icon/appliances.png" },
  { id: 5, name: "금", imgUrl: "icon/burn.png" },
  { id: 6, name: "토", imgUrl: "icon/sodai.png" },
  { id: 7, name: "일", imgUrl: "icon/resource.png" },
];

const MainPage = () => {
  const [isReady, setIsReady] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  // 검색 관리
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 지역 선택 관리
  const [selected, setSelected] = useState(null);
  // 주간 일정 관리
  const [weekInfo, setWeekInfo] = useState(week);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/data/categoryData.json`);
      setCategoryData(response.data);
    } catch (e) {
      console.error("Error fetching category data:", e);
    } finally {
      setIsReady(true);
    }
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Main">
      <div className="GomiSearch">
        <input
          type="text"
          placeholder="무엇을 버리시나요?(예: 우산, 건전지등)"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleEnter}
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
        <QuickCategoryList quickCategory={categoryData} />
      </div>
    </div>
  );
};
export default MainPage;
