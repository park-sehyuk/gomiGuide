import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TokyoMap,
  TodayInfo,
  WeekInfo,
  QuickCategoryList,
} from "../components/mainPage";
import "./MainPage.css";

const DAY_MAP = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

const MainPage = () => {
  const [isReady, setIsReady] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  // 검색 관리
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 지역 선택 관리
  const [selectedArea, setSelectedArea] = useState("SHINJUKU");
  const [dayOfWeek, setDayOfWeek] = useState([])
  const toDay = DAY_MAP[new Date().getDay()]
  console.log(toDay);

  useEffect(() => {
      (async () => {
        try {
          const res = await fetch("/api/category");
          if (!res.ok) throw new Error(`category fetch failed: ${res.status}`);
          const data = await res.json();
          setCategoryData(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error("category load failed:", e);
          setCategoryData([]);
        }finally {
          setIsReady(true)
        }
      })();
    }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/areaRule/${selectedArea}`);
        if (!res.ok) throw new Error(`area fetch failed: ${res.status}`);
        const data = await res.json();
        console.log(data);
        setDayOfWeek(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("area load failed:", e);
        setDayOfWeek([]);
      }finally {
        setIsReady(true)
      }
    })();
  }, []);

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

  const filterDay = dayOfWeek.filter((nowDay) =>
  nowDay === toDay)

  console.log(filterDay);

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
          <TokyoMap selectWard={(ward) => setSelectedArea(ward)} />
        </div>
      </div>
      <div className="Infos">
        <div className="TodayInfoPage">
          <h2>오늘의 배출 정보 (Today)</h2>
          <TodayInfo toDays={filterDay} selectedArea={selectedArea}/>
        </div>
        <div className="WeekInfoPage">
          <h2>주간 일정 (Weekly)</h2>
          <WeekInfo weekInfo={dayOfWeek} />
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
