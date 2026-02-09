const DataManagementSection = ({ onExport, onImport, onReset }) => {
  return (
    <section className="Card">
      <div className="CardHeader">
        <h2 className="CardTitle">데이터 관리</h2>
        <p className="CardDesc">백업/복구/초기화 기능(운영 안전장치).</p>
      </div>

      <div className="Form">
        <div className="Field">
          <label className="Label">데이터 내보내기</label>
          <p className="Hint">
            현재 품목/지역/요일 데이터를 JSON 또는 CSV로 백업합니다.
          </p>
          <button className="GhostBtn" onClick={onExport} type="button">
            내보내기
          </button>
        </div>

        <div className="Field">
          <label className="Label">데이터 가져오기</label>
          <p className="Hint">백업 파일을 업로드하여 복구합니다.</p>
          <button className="GhostBtn" onClick={onImport} type="button">
            가져오기
          </button>
        </div>

        <div className="Field DangerBox">
          <label className="Label DangerText">초기화</label>
          <p className="Hint">
            모든 데이터를 초기값으로 되돌립니다. (신중하게)
          </p>
          <button className="DangerBtn" onClick={onReset} type="button">
            전체 초기화
          </button>
        </div>
      </div>
    </section>
  );
};

export default DataManagementSection;
