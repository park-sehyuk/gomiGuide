import { useEffect, useMemo, useState } from "react";
import "./DischargeInfo.css";

const DAY_LABEL = {
  MON: "월",
  TUE: "화",
  WED: "수",
  THU: "목",
  FRI: "금",
  SAT: "토",
  SUN: "일",
};

const DAY_ORDER = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const DischargeInfo = ({ areas, categoryName }) => {
  const list = Array.isArray(areas) ? areas : [];
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [rules, setRules] = useState([]);

  useEffect(() => {
    if (list.length > 0 && !selectedAreaId) {
      setSelectedAreaId(list[0].areaId ?? list[0].id ?? "");
    }
  }, [list, selectedAreaId]);

  useEffect(() => {
    if (!selectedAreaId) return;
    (async () => {
      try {
        const res = await fetch(`/api/areaRule/${selectedAreaId}`);
        if (!res.ok) throw new Error(`areaRule fetch failed: ${res.status}`);
        const data = await res.json();
        setRules(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("areaRule load failed:", e);
        setRules([]);
      }
    })();
  }, [selectedAreaId]);

  const dayText = useMemo(() => {
    if (!rules.length) return "배출일 정보가 없습니다.";
    const filtered = rules.filter((r) => {
      const name = r.categoryNameKo ?? "";
      return categoryName ? name === categoryName : true;
    });
    if (!filtered.length) return "배출일 정보가 없습니다.";
    const set = new Set(
      filtered
        .map((r) => r.dayOfWeek)
        .filter((d) => typeof d === "string")
    );
    const ordered = DAY_ORDER.filter((d) => set.has(d));
    if (!ordered.length) return "배출일 정보가 없습니다.";
    const labels = ordered.map((d) => DAY_LABEL[d] ?? d);
    return `${labels.join("/")} 배출일입니다.`;
  }, [rules]);

  return (
    <div className="DischargeInfo">
      <img src="/icon/garbagetruck.png" alt="쓰레기차" />
      <div className="DisInfo">
        <select
          value={selectedAreaId}
          onChange={(e) => setSelectedAreaId(e.target.value)}
        >
          {list.map((area) => (
            <option key={area.areaId ?? area.id} value={area.areaId ?? area.id}>
              {area.nameKo ?? "-"}
            </option>
          ))}
        </select>
        <p>{dayText}</p>
      </div>
    </div>
  );
};

export default DischargeInfo;
