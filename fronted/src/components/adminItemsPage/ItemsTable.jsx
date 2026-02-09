import "./ItemsTable.css";

const ItemsTable = ({ items, onEdit, onDelete }) => {
  return (
    <div className="TableWrap">
      <table className="Table">
        <thead>
          <tr>
            <th style={{ width: 70 }}>ID</th>
            <th>이름(ko)</th>
            <th>이름(jp)</th>
            <th style={{ width: 140 }}>카테고리</th>
            <th style={{ width: 180 }}>공식 링크</th>
            <th style={{ width: 160 }}>관리</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className="Empty">
                검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            items.map((it) => (
              <tr key={it.id ?? `${it.nameKo}-${it.nameJp}`}>
                <td className="Mono">{it.id ?? "-"}</td>
                <td>{it.nameKo ?? "-"}</td>
                <td>{it.nameJp ?? "-"}</td>
                <td>
                  <span className="Badge">{it.category ?? "-"}</span>
                </td>
                <td>
                  {it.officialLink ? (
                    <a
                      className="Link"
                      href={it.officialLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      열기
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <div className="Actions">
                    <button className="SmallBtn" onClick={() => onEdit(it)}>
                      수정
                    </button>
                    <button className="DangerBtn" onClick={() => onDelete(it)}>
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
