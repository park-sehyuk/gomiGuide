import "./DischargeInfo.css";

const DischargeInfo = () => {
  return (
    <div className="DischargeInfo">
      <img src="/icon/garbagetruck.png" alt="쓰레기차" />
      <div className="DisInfo">
        <select>
          <option value="shinjuku">신주쿠</option>
          <option value="shibuya">시부야</option>
          <option value="meguro">메구로</option>
        </select>
        <p>월/화 배출일입니다.</p>
      </div>
    </div>
  );
};

export default DischargeInfo;
