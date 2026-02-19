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
          <label className="Label">지역 ID</label>
          <input
            className="TextInput"
            value={area.id ?? ""}
            onChange={(e) => setField("id", e.target.value)}
            placeholder="예: shinjuku"
            disabled={!area.isNew}
          />
        </div>

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
          <label className="Label">활성 여부</label>
          <select
            className="Select"
            value={area.active ? "true" : "false"}
            onChange={(e) => setField("active", e.target.value === "true")}
          >
            <option value="true">활성</option>
            <option value="false">비활성</option>
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
          <div className="ScheduleMeta">
            <div className="Field Inline">
              <label className="Label">수거 시간</label>
              <div className="InlineInputs">
                <input
                  className="TextInput"
                  type="time"
                  value={area.schedule?.timeStart ?? ""}
                  onChange={(e) =>
                    setField("schedule", {
                      ...area.schedule,
                      timeStart: e.target.value,
                    })
                  }
                />
                <span className="Sep">~</span>
                <input
                  className="TextInput"
                  type="time"
                  value={area.schedule?.timeEnd ?? ""}
                  onChange={(e) =>
                    setField("schedule", {
                      ...area.schedule,
                      timeEnd: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="Field Inline">
              <label className="Label">적용 기간</label>
              <div className="InlineInputs">
                <input
                  className="TextInput"
                  type="date"
                  value={area.schedule?.effectiveFrom ?? ""}
                  onChange={(e) =>
                    setField("schedule", {
                      ...area.schedule,
                      effectiveFrom: e.target.value,
                    })
                  }
                />
                <span className="Sep">~</span>
                <input
                  className="TextInput"
                  type="date"
                  value={area.schedule?.effectiveTo ?? ""}
                  onChange={(e) =>
                    setField("schedule", {
                      ...area.schedule,
                      effectiveTo: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
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
