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

  const [gomiData, setGomiData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/data/gomiData.json`);
      setGomiData(response.data);
      const res = await axios.get(`/data/categoryData.json`);
      setCategoryData(res.data);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setIsReady(true);
    }
  };

  const filteredGomiData = gomiData.filter(
    (item) => item.categoryKo === category + " 쓰레기",
  );

  const filteredCategoryData = categoryData.filter(
    (item) => item.name === category,
  );

  const handleBack = () => {
    navigate(-1);
  };

  if (!isReady) {
    return <div>Loading...</div>;
  }
  return (
    <div className="QuickCategoryPage">
      <div className="CategoryInfoPage">
        <CategoryInfo category={filteredCategoryData} />
      </div>
      <div className="DischargeData">
        <DischargeInfo />
      </div>
      <div className="GomiListPage">
        <GomiList gomiList={filteredGomiData} />
      </div>
      <div className="BackButton">
        <button onClick={handleBack}>뒤로가기</button>
      </div>
    </div>
  );
};

export default QuickCategoryPage;
