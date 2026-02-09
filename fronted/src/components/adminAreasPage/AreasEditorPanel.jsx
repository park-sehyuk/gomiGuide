import WeekdayScheduleGrid from "./WeekdayScheduleGrid";
import "./AreasEditorPanel.css";

const AreasEditorPanel = ({ area, onChange, onSave, onCancel }) => {
  if (!area) {
    return (
      <div className="AreasEditorPanel">
        <div className="EmptyEditor">
          왼쪽에서 지역을 선택하거나, “새 지역 등록”을 눌러 시작하세요.
        </div>
      </div>
    );
  }

  const setField = (key, value) => onChange({ ...area, [key]: value });

  return (
    <div className="AreasEditorPanel">
      <div className="EditorHeader">
        <h2 className="EditorTitle">지역 정보 편집</h2>
        <div className="EditorActions">
          <button className="GhostBtn" onClick={onCancel} type="button">
            취소
          </button>
          <button className="PrimaryBtn" onClick={onSave} type="button">
            저장
          </button>
        </div>
      </div>

      <div className="EditorForm">
        <div className="Field">
          <label className="Label">지역명(한국어)</label>
          <input
            className="TextInput"
            value={area.nameKo ?? ""}
            onChange={(e) => setField("nameKo", e.target.value)}
            placeholder="예: 신주쿠구"
          />
        </div>

        <div className="Field">
          <label className="Label">지역명(일본어)</label>
          <input
            className="TextInput"
            value={area.nameJp ?? ""}
            onChange={(e) => setField("nameJp", e.target.value)}
            placeholder="예: 新宿区"
          />
        </div>

        <div className="Field">
          <label className="Label">구/시 타입</label>
          <select
            className="Select"
            value={area.type ?? "ward"}
            onChange={(e) => setField("type", e.target.value)}
          >
            <option value="ward">구(区)</option>
            <option value="city">시(市)</option>
          </select>
        </div>

        <div className="Field">
          <label className="Label">특이사항/메모</label>
          <textarea
            className="Textarea"
            rows={3}
            value={area.note ?? ""}
            onChange={(e) => setField("note", e.target.value)}
            placeholder="예: 공휴일이면 다음 수거일로 변경됨"
          />
        </div>

        <div className="Field">
          <label className="Label">요일표</label>
          <WeekdayScheduleGrid
            schedule={area.schedule ?? {}}
            onChange={(next) => setField("schedule", next)}
          />
          <p className="Hint">● : 수거함 / ○ : 수거 안 함</p>
        </div>
      </div>
    </div>
  );
};

export default AreasEditorPanel;
