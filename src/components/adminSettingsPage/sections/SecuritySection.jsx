const SecuritySection = ({
  adminName,
  setAdminName,
  currentPw,
  setCurrentPw,
  newPw,
  setNewPw,
  newPw2,
  setNewPw2,
  onChangePassword,
}) => {
  return (
    <section className="Card">
      <div className="CardHeader">
        <h2 className="CardTitle">보안 / 관리자 계정</h2>
        <p className="CardDesc">관리자 계정 및 비밀번호를 관리합니다.</p>
      </div>

      <div className="Form">
        <div className="Field">
          <label className="Label">관리자 ID</label>
          <input
            className="TextInput"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            placeholder="admin"
          />
        </div>

        <div className="Divider" />

        <div className="Field">
          <label className="Label">현재 비밀번호</label>
          <input
            className="TextInput"
            type="password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            placeholder="현재 비밀번호"
          />
        </div>

        <div className="Field">
          <label className="Label">새 비밀번호</label>
          <input
            className="TextInput"
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            placeholder="새 비밀번호"
          />
          <p className="Hint">8자 이상, 영문/숫자/특수문자 조합 권장</p>
        </div>

        <div className="Field">
          <label className="Label">새 비밀번호 확인</label>
          <input
            className="TextInput"
            type="password"
            value={newPw2}
            onChange={(e) => setNewPw2(e.target.value)}
            placeholder="새 비밀번호 확인"
          />
        </div>

        <div className="ActionsRow">
          <button
            className="PrimaryBtn"
            onClick={onChangePassword}
            type="button"
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
