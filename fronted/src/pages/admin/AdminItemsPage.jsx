import { useState, useEffect, useMemo } from "react";
import {
  ItemsHeader,
  ItemsFilterBar,
  ItemsTable,
  ItemsPagination,
} from "../../components/adminItemsPage";
import "./AdminItemsPage.css";

const AdminItemsPage = () => {
  const [items, setItems] = useState([]);

  const [query, setQuery] = useState("all");
  const [category, setCategory] = useState("all");
  const [sortKey, setSortKey] = useState("nameKo");
  const [sortDir, setSortDir] = useState("asc");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/gomiData.json");
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("gomiData load failed:", e);
        setItems([]);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((it) => it.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = items.slice();

    if (category !== "all") arr = arr.filter((it) => it.category === category);

    if (q) {
      arr = arr.filter((it) => {
        const nameKo = (it.nameKo || "").toLowerCase();
        const nameJp = (it.nameJp || "").toLowerCase();
        return nameKo.includes(q) || nameJp.includes(q);
      });
    }

    arr.sort((a, b) => {
      const aVal = (a[sortKey] ?? "").toString();
      const bVal = (b[sortKey] ?? "").toString();
      const cmp = aVal.localeCompare(bVal, "ko");
      return sortDir === "asc" ? cmp : -cmp;
    });

    return arr;
  }, [items, query, category, sortKey, sortDir]);

  const total = filtered.length;

  // pagination slice
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  const toggleSortDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  const handleCreate = () => alert("다음 단계에서 등록 폼 연결!");
  const handleEdit = (item) =>
    alert(`다음 단계에서 수정 폼 연결! (${item.nameKo})`);
  const handleDelete = (item) =>
    alert(`다음 단계에서 삭제 처리 연결! (${item.nameKo})`);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  // 필터가 바뀌면 1페이지로
  useEffect(() => {
    setPage(1);
  }, [query, category, sortKey, sortDir]);

  return (
    <div className="AdminItems">
      <ItemsHeader total={total} onCreate={handleCreate} />

      <ItemsFilterBar
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortDir={sortDir}
        toggleSortDir={toggleSortDir}
      />

      <ItemsTable items={paged} onEdit={handleEdit} onDelete={handleDelete} />

      <ItemsPagination
        page={safePage}
        totalPages={totalPages}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
};

export default AdminItemsPage;
