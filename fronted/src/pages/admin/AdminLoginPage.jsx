import "./AdminLoginPage.css";

const AdminLoginPage = () => {
  return (
    <div className="AdminLoginPage">
      <h1>관리자 로그인</h1>
      <input type="text" placeholder="아이디" />
      <input type="password" placeholder="비밀번호" />
      <button>로그인</button>
    </div>
  );
};

export default AdminLoginPage;
