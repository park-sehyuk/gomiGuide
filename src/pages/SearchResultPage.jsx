import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ResultCategory,
  Discharge,
  OfficialLink,
} from "../conponents/searchPage";
import "./SearchResultPage.css";

const Discharges = [
  {
    id: 1,
    nameKo: "프라이팬",
    nameJp: "フライパン",
    categoryKo: "불연성 쓰레기",
    categoryJp: "不燃ごみ",
    iconUrl: "../../public/icon/불연성.png",
    color: "#3498db",
    description: [
      "가장 긴 변이 30cm 미만인 경우 불연성 쓰레기로 분류됩니다.",
      "손잡이가 나무나 플라스틱인 경우, 분리가 가능하다면 분리하여 가연성 쓰레기로 버려주세요.",
      "금속 부분은 내용물을 비우고 깨끗이 씻어서 배출해야 합니다.",
    ],
    isSodai: false,
    officialLink: "https://www.city.shinjuku.lg.jp/seikatsu/index09_02.html",
  },
  {
    id: 2,
    nameKo: "우유팩",
    nameJp: "牛乳パック",
    categoryKo: "자원 쓰레기",
    categoryJp: "資源ごみ",
    iconUrl: "../../public/icon/자원류.png",
    color: "#2ecc71",
    description: [
      "내용물을 비우고 물로 깨끗이 씻어주세요.",
      "가위로 잘라 펼쳐서 말린 후 배출해야 합니다.",
      "플라스틱 뚜껑이 달린 경우 뚜껑은 따로 분리하여 플라스틱으로 버려주세요.",
    ],
    isSodai: false,
    officialLink: "https://www.city.shinjuku.lg.jp/seikatsu/index09_03.html",
  },
  {
    id: 3,
    nameKo: "소파",
    nameJp: "ソファー",
    categoryKo: "대형 쓰레기",
    categoryJp: "粗大ごみ",
    iconUrl: "../../public/icon/대형.png",
    color: "#e67e22",
    description: [
      "가장 긴 변이 30cm를 초과하는 가구류는 대형 쓰레기로 분류됩니다.",
      "지자체 대형 쓰레기 센터에 미리 전화나 인터넷으로 수거 예약을 해야 합니다.",
      "편의점에서 '대형 쓰레기 처리권(스티커)'을 구입하여 부착 후 배출하세요.",
    ],
    isSodai: true,
    officialLink: "https://www.tokyokankyo.or.jp/sodai/index.html",
  },
];

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [dischargeMethods, setDischargeMethods] = useState(Discharges);

  const filteredMethod = dischargeMethods.filter(
    (item) => item.nameKo.includes(query) || item.nameJp.includes(query),
  );

  return (
    <div className="SearchResultPage">
      <div className="Result">
        <h1>{filteredMethod[0]?.nameKo}</h1>
      </div>
      <div className="ResultCategory">
        <ResultCategory filteredMethod={filteredMethod} />
      </div>
      <div className="DischargeMethod">
        <h2>분리배출 방법</h2>
        <Discharge filteredMethod={filteredMethod} />
      </div>
      <div className="officialLink">
        <OfficialLink filteredMethod={filteredMethod} />
      </div>
    </div>
  );
};

export default SearchResultPage;
