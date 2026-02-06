import "./LogsTable.css";

const LevelBadge = ({ level }) => {
  const cls =
    level === "ERROR"
      ? "LevelBadge Error"
      : level === "WARN"
        ? "LevelBadge Warn"
        : "LevelBadge Info";
  return <span className={cls}>{level}</span>;
};

const TypeBadge = ({ type }) => {
  const label =
    type === "search"
      ? "검색"
      : type === "click"
        ? "클릭"
        : type === "admin"
          ? "관리자"
          : type === "error"
            ? "에러"
            : type;
  return <span className="Badge">{label}</span>;
};

const LogsTable = ({ logs }) => {
  return (
    <div className="TableWrap">
      <table className="Table">
        <thead>
          <tr>
            <th style={{ width: 170 }}>시간</th>
            <th style={{ width: 90 }}>레벨</th>
            <th style={{ width: 110 }}>유형</th>
            <th>내용</th>
            <th style={{ width: 140 }}>대상</th>
            <th style={{ width: 120 }}>사용자</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan={6} className="Empty">
                조건에 맞는 로그가 없습니다.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id}>
                <td className="Mono">{log.time}</td>
                <td>
                  <LevelBadge level={log.level} />
                </td>
                <td>
                  <TypeBadge type={log.type} />
                </td>
                <td className="Msg">{log.message}</td>
                <td className="Muted">{log.target ?? "-"}</td>
                <td className="Muted">{log.actor ?? "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;
