const LogSettingsSection = ({
  logEnabled,
  setLogEnabled,
  logRetentionDays,
  setLogRetentionDays,
  onSave,
}) => {
  return (
    <section className="Card">
      <div className="CardHeader">
        <h2 className="CardTitle">로그 설정</h2>
        <p className="CardDesc">검색/클릭/관리자 변경 기록을 관리합니다.</p>
      </div>

      <div className="Form">
        <div className="Field Inline">
          <div>
            <label className="Label">로그 수집</label>
            <p className="Hint">운영 분석과 오류 추적을 위해 권장합니다.</p>
          </div>

          <label className="Switch">
            <input
              type="checkbox"
              checked={logEnabled}
              onChange={(e) => setLogEnabled(e.target.checked)}
            />
            <span className="Slider" />
          </label>
        </div>

        <div className="Field">
          <label className="Label">로그 보관 기간</label>
          <div className="Row">
            <input
              className="TextInput"
              type="number"
              min={1}
              max={365}
              value={logRetentionDays}
              onChange={(e) => setLogRetentionDays(Number(e.target.value))}
            />
            <span className="Unit">일</span>
          </div>
          <p className="Hint">
            기간이 지나면 로그를 자동으로 정리합니다(다음 단계).
          </p>
        </div>

        <div className="ActionsRow">
          <button className="PrimaryBtn" onClick={onSave} type="button">
            저장
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogSettingsSection;
