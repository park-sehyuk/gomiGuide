import { useState, useEffect, useMemo } from "react";
import {
  LogsHeader,
  LogsFilterBar,
  LogsTable,
  LogsPagination,
} from "../../components/adminLogsPage";
import "./AdminLogsPage.css";

const MOCK_LOGS = [
  {
    id: "l1",
    time: "2026-02-06 14:12",
    level: "INFO",
    type: "search",
    message: '검색: "플라스틱 병"',
    target: "item:plastic-bottle",
    actor: "guest",
  },
  {
    id: "l2",
    time: "2026-02-06 14:13",
    level: "INFO",
    type: "click",
    message: "공식 링크 클릭",
    target: "link:tokyo.jp",
    actor: "guest",
  },
  {
    id: "l3",
    time: "2026-02-06 14:20",
    level: "WARN",
    type: "admin",
    message: "품목 배출방법 수정",
    target: "item:glass-bottle",
    actor: "admin",
  },
  {
    id: "l4",
    time: "2026-02-06 14:31",
    level: "ERROR",
    type: "error",
    message: "404 Not Found: /detail/999",
    target: "route:/detail/999",
    actor: "system",
  },
];

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([]);

  // filters
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [level, setLevel] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    // 다음 단계에서 실제 로그 API로 교체
    setLogs(MOCK_LOGS);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return logs.filter((l) => {
      if (type !== "all" && l.type !== type) return false;
      if (level !== "all" && l.level.toLowerCase() !== level) return false;

      if (from) {
        // time이 "YYYY-MM-DD ..." 형태라고 가정
        if (l.time.slice(0, 10) < from) return false;
      }
      if (to) {
        if (l.time.slice(0, 10) > to) return false;
      }

      if (!q) return true;

      const msg = (l.message ?? "").toLowerCase();
      const tgt = (l.target ?? "").toLowerCase();
      const act = (l.actor ?? "").toLowerCase();
      return msg.includes(q) || tgt.includes(q) || act.includes(q);
    });
  }, [logs, query, type, level, from, to]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, type, level, from, to]);

  const onReset = () => {
    setQuery("");
    setType("all");
    setLevel("all");
    setFrom("");
    setTo("");
  };

  const onExport = () => alert("다음 단계에서 CSV 다운로드 구현!");
  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="AdminLogs">
      <LogsHeader total={total} onExport={onExport} />

      <LogsFilterBar
        query={query}
        setQuery={setQuery}
        level={level}
        setLevel={setLevel}
        type={type}
        setType={setType}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        onReset={onReset}
      />

      <LogsTable logs={paged} />

      <LogsPagination
        page={safePage}
        totalPages={totalPages}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
};

export default AdminLogsPage;
