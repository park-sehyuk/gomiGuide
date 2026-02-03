import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./conponents";
import { MainPage, SearchResultPage } from "./pages";
import "./App.css";

const LayOut = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayOut />} path="/">
            <Route element={<MainPage />} index />
            <Route element={<SearchResultPage />} path="search" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
