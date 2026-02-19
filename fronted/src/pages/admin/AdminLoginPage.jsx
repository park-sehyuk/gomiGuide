import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLoginPage.css";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        let message = "로그인에 실패했습니다. 아이디/비밀번호를 확인해주세요.";
        try {
          const data = JSON.parse(text);
          if (data?.message) message = data.message;
        } catch {
          // ignore parse errors
        }
        throw new Error(message);
      }
      const checkRes = await fetch("/api/admin/check", {
        credentials: "include",
      });
      if (!checkRes.ok) throw new Error("로그인 후 권한 확인에 실패했습니다.");
      const checkData = await checkRes.json();
      const roles = Array.isArray(checkData?.role) ? checkData.role : [];
      const isAdmin =
        roles.includes("ROLE_ADMIN") || roles.includes("ROLE_SUPER_ADMIN");
      if (!checkData?.authenticated || !isAdmin) {
        throw new Error("관리자 권한이 없습니다.");
      }
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("admin login failed:", err);
      const message = err instanceof Error ? err.message : "로그인에 실패했습니다.";
      setError(message);
      alert(message);
    }
  };

  return (
    <div className="AdminLoginPage">
      <h1>관리자 로그인</h1>
      <form onSubmit={handleSubmit} className="LoginForm">
        <input
          type="text"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="Error">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
