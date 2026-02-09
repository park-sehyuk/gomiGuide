import { useState, useMemo } from "react";
import {
  AreasHeader,
  AreasListPanel,
  AreasEditorPanel,
} from "../../components/adminAreasPage";
import "./AdminAreasPage.css";

const MOCK_AREAS = [
  {
    id: "ward-shinjuku",
    type: "ward",
    nameKo: "신주쿠구",
    nameJp: "新宿区",
    note: "",
    schedule: {
      burnable: [0, 2, 4],
      recyclable: [1],
      nonburnable: [3],
      sodai: [],
    },
  },
  {
    id: "ward-shibuya",
    type: "ward",
    nameKo: "시부야구",
    nameJp: "渋谷区",
    note: "대형쓰레기는 사전 신청 필요",
    schedule: {
      burnable: [1, 3, 5],
      recyclable: [2],
      nonburnable: [4],
      sodai: [],
    },
  },
  {
    id: "city-hachioji",
    type: "city",
    nameKo: "하치오지시",
    nameJp: "八王子市",
    note: "",
    schedule: {
      burnable: [0, 3],
      recyclable: [2],
      nonburnable: [4],
      sodai: [5],
    },
  },
];

const AdminAreasPage = () => {
  const [areas, setAreas] = useState(MOCK_AREAS);
  const [selectedId, setSelectedId] = useState(areas[0]?.id ?? null);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const selected = useMemo(
    () => areas.find((a) => a.id === selectedId) ?? null,
    [areas, selectedId],
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return areas.filter((a) => {
      if (type !== "all" && a.type !== type) return false;
      if (!q) return true;

      const ko = (a.nameKo ?? "").toLowerCase();
      const jp = (a.nameJp ?? "").toLowerCase();
      return ko.includes(q) || jp.includes(q);
    });
  }, [areas, query, type]);

  const onCreate = () => {
    const newArea = {
      id: `new-${Date.now()}`,
      type: "ward",
      nameKo: "새 지역",
      nameJp: "",
      note: "",
      schedule: { burnable: [], nonburnable: [], recyclable: [], sodai: [] },
    };
    setAreas((prev) => [newArea, ...prev]);
    setSelectedId(newArea.id);
  };

  const onChange = (nextArea) => {
    setAreas((prev) => prev.map((a) => (a.id === nextArea.id ? nextArea : a)));
  };

  const onSave = () => alert("다음 단계에서 실제 저장(API/DB) 연결!");
  const onCancel = () => alert("다음 단계에서 변경사항 롤백 구현!");

  return (
    <div className="AdminAreas">
      <AreasHeader total={areas.length} onCreate={onCreate} />

      <div className="AreasLayout">
        <AreasListPanel
          areas={list}
          selectedId={selectedId}
          onSelect={setSelectedId}
          query={query}
          setQuery={setQuery}
          type={type}
          setType={setType}
        />

        <AreasEditorPanel
          area={selected}
          onChange={onChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default AdminAreasPage;
