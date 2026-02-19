import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  CategoryInfo,
  GomiList,
  DischargeInfo,
} from "../components/quickCategoryPage";
import "./QuickCategoryPage.css";

const QuickCategoryPage = () => {
  const { category } = useParams();
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `/api/items/category/${encodeURIComponent(category)}`
        );
        if (!res.ok) throw new Error(`items fetch failed: ${res.status}`);
        const data = await res.json();
        setCategoryData(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("items load failed:", e);
        setCategoryData([]);
      }finally {
        setIsReady(true)
      }
    })();
  }, [category]);

  useEffect(() => {
    (async () => {
      try{
        const res = await fetch(
            `/api/area`
        );
        if(!res.ok) throw new Error(`area fetech failed : ${res.status}`);
        const data = await res.json();
        setAreas(Array.isArray(data) ? data : []);
      }catch (e){
        console.error(`area load filed : `, e);
        setAreas([]);
      }finally {
        setIsReady(true);
      }
    })();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  if (!isReady) {
    return <div>Loading...</div>;
  }
  return (
    <div className="QuickCategoryPage">
      <div className="CategoryInfoPage">
        <CategoryInfo category={categoryData} />
      </div>
      <div className="DischargeData">
        <DischargeInfo areas={areas} categoryName={category} />
      </div>
      <div className="GomiListPage">
        <GomiList gomiList={categoryData} />
      </div>
      <div className="BackButton">
        <button onClick={handleBack}>뒤로가기</button>
      </div>
    </div>
  );
};

export default QuickCategoryPage;
