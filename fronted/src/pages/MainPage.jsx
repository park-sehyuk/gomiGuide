import { useState, useEffect, useMemo } from "react";
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
  const [areas, setAreas] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [loadingRules, setLoadingRules] = useState(true);

  // 검색 관리
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 지역 선택 관리
  const [selectedArea, setSelectedArea] = useState("shinjuku");
  const [selectedAreaNameKo, setSelectedAreaNameKo] = useState("신주쿠구");
  const [dayOfWeek, setDayOfWeek] = useState([])
  const toDay = DAY_MAP[new Date().getDay()]

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
      } finally {
        setLoadingCategory(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/area");
        if (!res.ok) throw new Error(`area list fetch failed: ${res.status}`);
        const data = await res.json();
        setAreas(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("area list load failed:", e);
        setAreas([]);
      } finally {
        setLoadingAreas(false);
      }
    })();
  }, []);

  const resolvedAreaId = useMemo(() => {
    const match = areas.find((a) => a.nameKo === selectedAreaNameKo);
    return match?.areaId ?? match?.id ?? selectedArea;
  }, [areas, selectedAreaNameKo, selectedArea]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/areaRule/${resolvedAreaId}`);
        if (!res.ok) throw new Error(`area fetch failed: ${res.status}`);
        const data = await res.json();
        setDayOfWeek(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("area load failed:", e);
        setDayOfWeek([]);
      } finally {
        setLoadingRules(false);
      }
    })();
  }, [resolvedAreaId]);

  useEffect(() => {
    setIsReady(!loadingCategory && !loadingAreas && !loadingRules);
  }, [loadingCategory, loadingAreas, loadingRules]);

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

  const filterDay = dayOfWeek.filter(
    (dayInfo) => dayInfo.dayOfWeek === toDay
  );

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
          <TokyoMap
            selectWard={(ward) => {
              setSelectedArea(ward.id);
              setSelectedAreaNameKo(ward.nameKo);
            }}
          />
        </div>
      </div>
      <div className="Infos">
        <div className="TodayInfoPage">
          <h2>오늘의 배출 정보 (Today)</h2>
          <TodayInfo toDays={filterDay} selectedArea={selectedAreaNameKo}/>
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
