import "./AdminPage.css";
const AdminPage = () => {
  return (
    <div className="AdminPage">
      <div className="LeftBar">
        <div className="Region">
          <img src="/icon/region.png" alt="지역" />
          <p>지역</p>
        </div>
        <div className="gomi">
          <img src="/icon/gomi.png" alt="쓰레기" />
          <p>쓰레기</p>
        </div>
      </div>
      <div className="RightContent">
        <p>정영재관리자님 어서오세요~!!</p>
      </div>
    </div>
  );
};

export default AdminPage;
