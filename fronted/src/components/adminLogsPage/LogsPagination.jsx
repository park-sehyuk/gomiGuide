import "./LogsPagination.css";

const LogsPagination = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className="Pagination">
      <button
        className="GhostBtn"
        onClick={onPrev}
        disabled={page <= 1}
        type="button"
      >
        이전
      </button>
      <span className="PageInfo">
        {page} / {totalPages}
      </span>
      <button
        className="GhostBtn"
        onClick={onNext}
        disabled={page >= totalPages}
        type="button"
      >
        다음
      </button>
    </div>
  );
};

export default LogsPagination;
