import { useState, useEffect, use } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { SearchItem } from "../conponents/searchResultPage";

import "./SearchResultPage.css";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [isReady, setIsReady] = useState(false);

  const [dischargeMethods, setDischargeMethods] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/data/gomiData.json`);
      setDischargeMethods(response.data);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setIsReady(true);
    }
  };

  const filteredMethod = dischargeMethods.filter(
    (item) => item.nameKo.includes(query) || item.nameJp.includes(query),
  );

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SearchResultPage">
      <h1 className="ResultCount">
        총 <span>{filteredMethod.length}</span>건의 결과가 있습니다.
      </h1>
      <div className="FilterItem">
        {filteredMethod.map((item) => (
          <SearchItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
