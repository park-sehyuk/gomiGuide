import { useEffect, useMemo, useState } from "react";
import {
  AreasHeader,
  AreasListPanel,
  AreasEditorPanel,
} from "../../components/adminAreasPage";
import "./AdminAreasPage.css";

const AdminAreasPage = () => {
  const [areas, setAreas] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const selected = useMemo(
    () => areas.find((a) => a.id === selectedId) ?? null,
    [areas, selectedId],
  );

  const loadAreas = async () => {
    try {
      const res = await fetch("/api/admin/areas", {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`areas fetch failed: ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setAreas(list);
      setSelectedId(list[0]?.id ?? null);
    } catch (e) {
      console.error("areas load failed:", e);
      setAreas([]);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    loadAreas();
  }, []);

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
      id: "",
      type: "ward",
      nameKo: "",
      nameJp: "",
      note: "",
      active: true,
      schedule: {
        burnable: [],
        nonburnable: [],
        recyclable: [],
        sodai: [],
        timeStart: "",
        timeEnd: "",
        effectiveFrom: "",
        effectiveTo: "",
      },
      isNew: true,
    };
    setAreas((prev) => [newArea, ...prev]);
    setSelectedId(newArea.id);
  };

  const onChange = (nextArea) => {
    setAreas((prev) => prev.map((a) => (a.id === nextArea.id ? nextArea : a)));
  };

  const onSave = async () => {
    if (!selected) return;
    if (!selected.id || !selected.id.trim()) {
      alert("지역 ID는 필수입니다.");
      return;
    }

    try {
      const res = await fetch(
        selected.isNew
          ? "/api/admin/areas"
          : `/api/admin/areas/${encodeURIComponent(selected.id)}`,
        {
          method: selected.isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(selected),
        }
      );
      if (!res.ok) throw new Error(`save failed: ${res.status}`);
      await loadAreas();
    } catch (e) {
      console.error("area save failed:", e);
      alert("저장에 실패했습니다. 입력값을 확인해주세요.");
    }
  };

  const onCancel = () => {
    loadAreas();
  };

  if (!isReady) return <div>Loading...</div>;

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
