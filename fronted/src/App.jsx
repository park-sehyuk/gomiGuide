import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Header } from "./components";
import {
  MainPage,
  SearchDetailPage,
  SearchResultPage,
  QuickCategoryPage,
  AdminPage,
} from "./pages";
import {
  AdminAreasPage,
  AdminDashboardPage,
  AdminItemsPage,
  AdminItemFormPage,
  AdminLoginPage,
} from "./pages/admin";
import "./App.css";
import axios from "axios";

const LayOut = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
};

const RequireAdmin = () => {
  const [state, setState] = useState({ loading: true, ok: false });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/check", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`admin check failed: ${res.status}`);
        const data = await res.json();
        const roles = Array.isArray(data?.role) ? data.role : [];
        const ok =
          data?.authenticated === true &&
          (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_SUPER_ADMIN"));
        setState({ loading: false, ok });
      } catch (e) {
        console.error("admin auth failed:", e);
        setState({ loading: false, ok: false });
      }
    })();
  }, []);

  if (state.loading) return <div>Loading...</div>;
  return state.ok ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

function App() {
  useEffect(() => {
    axios
      .get("/api/gomi")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          {/* 사용자 영역 */}
          <Route element={<LayOut />} path="/">
            <Route element={<MainPage />} index />
            <Route element={<SearchResultPage />} path="search" />
            <Route element={<SearchDetailPage />} path="detail/:id" />
            <Route
              element={<QuickCategoryPage />}
              path="quickCategory/:category"
            />
          </Route>

          {/* 관리자 영역 */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<RequireAdmin />}>
            <Route element={<AdminPage />} path="/admin">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="items" element={<AdminItemsPage />} />
            <Route path="items/new" element={<AdminItemFormPage />} />
            <Route path="items/:itemId/edit" element={<AdminItemFormPage />} />
            <Route path="areas" element={<AdminAreasPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
