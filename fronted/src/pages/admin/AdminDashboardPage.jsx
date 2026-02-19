import { useEffect, useState } from "react";
import {
  DashboardCards,
  RecentActivity,
} from "../../components/adminDashboardPage";
import "./AdminDashboardPage.css";

const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/dashboard", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`dashboard fetch failed: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("dashboard load failed:", e);
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  const counts = data?.counts ?? {};
  const today = data?.today ?? {};
  const todayCreated =
    (today.createdItems ?? 0) +
    (today.createdCategories ?? 0) +
    (today.createdAreas ?? 0);
  const todayUpdated =
    (today.updatedItems ?? 0) +
    (today.updatedCategories ?? 0) +
    (today.updatedAreas ?? 0);

  const cards = [
    { label: "총 품목", value: counts.itemTotal ?? 0 },
    { label: "총 카테고리", value: counts.categoryTotal ?? 0 },
    { label: "관리 지역", value: counts.areaTotal ?? 0 },
    { label: "동의어", value: counts.synonymTotal ?? 0 },
    { label: "오늘 등록", value: todayCreated },
    { label: "오늘 수정", value: todayUpdated },
  ];

  return (
    <div className="Dashboard">
      <h1 className="DashboardTitle">관리자 대시보드</h1>

      {/* 상단 카드 */}
      <div className="DashboardCards">
        {cards.map((card, index) => (
          <DashboardCards key={index} card={card} />
        ))}
      </div>

      <div className="DashboardSummary">
        <div>
          <h3>품목 상태</h3>
          <p>
            활성: {counts.itemActive ?? 0} / 비활성: {counts.itemInactive ?? 0}
          </p>
        </div>
        <div>
          <h3>카테고리 상태</h3>
          <p>
            활성: {counts.categoryActive ?? 0} / 비활성:{" "}
            {counts.categoryInactive ?? 0}
          </p>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="RecentBox">
        <h2>최근 활동</h2>
        <RecentActivity
          recentCreated={data?.recentCreatedItems ?? []}
          recentUpdated={data?.recentUpdatedItems ?? []}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
