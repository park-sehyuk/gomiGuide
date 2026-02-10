import { useState, useEffect, use } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  ResultCategory,
  Discharge,
  OfficialLink,
} from "../components/searchPage";
import "./SearchDetailPage.css";

const SearchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isReady, setIsReady] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/data/gomiData.json`);
      setItems(response.data);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setIsReady(true);
    }
  };

  const filteredItem = items.filter((item) => item.id === Number(id));

  const handleBack = () => {
    navigate(-1);
  };

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SearchDetailPage">
      <div className="Result">
        <h1>{filteredItem[0]?.nameKo}</h1>
      </div>
      <div className="ResultCategory">
        <ResultCategory filteredItem={filteredItem} />
      </div>
      <div className="DischargeMethod">
        <h2>분리배출 방법</h2>
        <Discharge filteredItem={filteredItem} />
      </div>
      <div className="OfficialLink">
        <OfficialLink filteredItem={filteredItem} />
      </div>
      <div className="BackButton">
        <button onClick={handleBack}>뒤로가기</button>
      </div>
    </div>
  );
};

export default SearchDetailPage;
