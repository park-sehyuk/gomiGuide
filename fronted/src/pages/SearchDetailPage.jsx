import { useState, useEffect } from "react";
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
  const [item, setItem] = useState({});

  useEffect(() => {
      (async () => {
          try {
              const res = await fetch(`/api/items/${id}`);
              if (!res.ok) throw new Error(`items fetch failed: ${res.status}`);
              const data = await res.json();
              console.log(data)
              setItem(data);
          } catch (e) {
              console.error("items load failed:", e);
              setItem({});
          }finally {
              setIsReady(true)
          }
      })();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!isReady) {
      return <div>Loading...</div>;
  }
  return (
    <div className="SearchDetailPage">
      <div className="Result">
        <h1>{item.nameKo}</h1>
      </div>
      <div className="ResultCategory">
        <ResultCategory item={item} />
      </div>
      <div className="DischargeMethod">
        <h2>분리배출 방법</h2>
        <Discharge item={item} />
      </div>
      <div className="OfficialLink">
        <OfficialLink item={item} />
      </div>
      <div className="BackButton">
        <button onClick={handleBack}>뒤로가기</button>
      </div>
    </div>
  );
};

export default SearchDetailPage;
