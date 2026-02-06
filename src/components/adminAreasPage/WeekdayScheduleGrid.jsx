import "./WeekdayScheduleGrid.css";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const TYPES = [
  { key: "burnable", label: "가연(可燃)" },
  { key: "nonburnable", label: "불연(不燃)" },
  { key: "recyclable", label: "자원(資源)" },
  { key: "sodai", label: "대형(粗大)" },
];

const WeekdayScheduleGrid = ({ schedule, onChange }) => {
  const toggle = (typeKey, dayIdx) => {
    const current = new Set(schedule[typeKey] ?? []);
    if (current.has(dayIdx)) current.delete(dayIdx);
    else current.add(dayIdx);

    onChange({
      ...schedule,
      [typeKey]: Array.from(current).sort((a, b) => a - b),
    });
  };

  return (
    <div className="ScheduleGrid">
      <div className="GridHead">
        <div className="GridCell Head">분류</div>
        {DAYS.map((d) => (
          <div key={d} className="GridCell Head">
            {d}
          </div>
        ))}
      </div>

      {TYPES.map((t) => (
        <div key={t.key} className="GridRow">
          <div className="GridCell Type">{t.label}</div>
          {DAYS.map((_, idx) => {
            const active = (schedule[t.key] ?? []).includes(idx);
            return (
              <button
                key={idx}
                type="button"
                className={`GridCell Toggle ${active ? "On" : ""}`}
                onClick={() => toggle(t.key, idx)}
                aria-pressed={active}
              >
                {active ? "●" : "○"}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WeekdayScheduleGrid;
