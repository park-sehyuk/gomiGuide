import { useState, useEffect, use } from "react";
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
  AdminLogsPage,
  AdminSettingsPage,
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
          <Route element={<AdminPage />} path="/admin">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="items" element={<AdminItemsPage />} />
            <Route path="areas" element={<AdminAreasPage />} />
            <Route path="logs" element={<AdminLogsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
