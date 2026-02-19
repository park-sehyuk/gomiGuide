import { NavLink, Outlet } from "react-router-dom";
import "./AdminPage.css";
const AdminPage = () => {
  return (
    <div className="AdminLayout">
      <div className="Sidebar">
        <NavLink to="Dashboard">대시보드</NavLink>
        <NavLink to="Items">품목 관리</NavLink>
        <NavLink to="Areas">지역/요일</NavLink>
      </div>

      <main className="AdminMain">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;
