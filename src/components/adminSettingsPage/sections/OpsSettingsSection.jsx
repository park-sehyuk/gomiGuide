const OpsSettingsSection = ({
  language,
  setLanguage,
  holidayRule,
  setHolidayRule,
  onSave,
  onCancel,
}) => {
  return (
    <section className="Card">
      <div className="CardHeader">
        <h2 className="CardTitle">운영 설정</h2>
        <p className="CardDesc">서비스 화면에 영향을 주는 기본 옵션입니다.</p>
      </div>

      <div className="Form">
        <div className="Field">
          <label className="Label">기본 언어</label>
          <select
            className="Select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ko">한국어</option>
            <option value="jp">日本語</option>
          </select>
          <p className="Hint">사용자 화면의 기본 표시 언어를 선택합니다.</p>
        </div>

        <div className="Field">
          <label className="Label">공휴일 수거 규칙</label>
          <select
            className="Select"
            value={holidayRule}
            onChange={(e) => setHolidayRule(e.target.value)}
          >
            <option value="next">공휴일이면 다음 수거일로</option>
            <option value="same">공휴일에도 수거(변경 없음)</option>
            <option value="hide">공휴일 안내 숨김</option>
          </select>
          <p className="Hint">지역별 안내 문구/표시 방식에 영향을 줍니다.</p>
        </div>

        <div className="ActionsRow">
          <button className="PrimaryBtn" onClick={onSave} type="button">
            저장
          </button>
          <button className="GhostBtn" onClick={onCancel} type="button">
            취소
          </button>
        </div>
      </div>
    </section>
  );
};

export default OpsSettingsSection;
