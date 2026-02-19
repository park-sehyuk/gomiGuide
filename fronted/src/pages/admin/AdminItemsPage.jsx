import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ItemsHeader,
  ItemsFilterBar,
  ItemsTable,
  ItemsPagination,
} from "../../components/adminItemsPage";
import "./AdminItemsPage.css";

const AdminItemsPage = () => {
  const [items, setItems] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortKey, setSortKey] = useState("nameKo");
  const [sortDir, setSortDir] = useState("asc");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const loadItems = async () => {
    try {
      const res = await fetch("/api/admin/items", {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`items fetch failed: ${res.status}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("items load failed:", e);
      setItems([]);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((it) => it.categoryNameKo).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = items.slice();

    if (category !== "all")
      arr = arr.filter((it) => it.categoryNameKo === category);

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

  const handleCreate = () => navigate("/admin/items/new");
  const handleEdit = (item) => navigate(`/admin/items/${item.itemId}/edit`);
  const handleDelete = async (item) => {
    const ok = window.confirm(`삭제하시겠습니까? (${item.nameKo})`);
    if (!ok) return;
    try {
      const res = await fetch(`/api/admin/items/${item.itemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`delete failed: ${res.status}`);
      await loadItems();
    } catch (e) {
      console.error("delete failed:", e);
      alert("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  // 필터가 바뀌면 1페이지로
  useEffect(() => {
    setPage(1);
  }, [query, category, sortKey, sortDir]);

  if (!isReady) {
    return <div>Loading...</div>;
  }

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
