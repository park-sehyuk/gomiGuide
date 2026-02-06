import {
  DashboardCards,
  RecentActivity,
} from "../../components/adminDashboardPage";
import "./AdminDashboardPage.css";

const cards = [
  { label: "총 품목", value: 40 },
  { label: "관리 지역", value: 23 },
  { label: "오늘 수정", value: 3 },
  { label: "검색 수", value: 128 },
];

const AdminDashboardPage = () => {
  return (
    <div className="Dashboard">
      <h1 className="DashboardTitle">관리자 대시보드</h1>

      {/* 상단 카드 */}
      <div className="DashboardCards">
        {cards.map((card, index) => (
          <DashboardCards key={index} card={card} />
        ))}
      </div>

      {/* 최근 활동 */}
      <div className="RecentBox">
        <h2>최근 활동</h2>
        <RecentActivity />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
