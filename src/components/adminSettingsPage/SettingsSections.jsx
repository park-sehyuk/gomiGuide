import { useState } from "react";
import "./SettingsSections.css";

const SettingsSections = () => {
  const [language, setLanguage] = useState("ko"); // ko | jp
  const [holidayRule, setHolidayRule] = useState("next"); // next | same | hide
  const [logEnabled, setLogEnabled] = useState(true);
  const [logRetentionDays, setLogRetentionDays] = useState(30);

  const [adminName, setAdminName] = useState("admin");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");

  const saveAll = () => alert("다음 단계에서 설정 저장(API/DB) 연결!");
  const exportData = () =>
    alert("다음 단계에서 데이터 내보내기(JSON/CSV) 연결!");
  const importData = () => alert("다음 단계에서 데이터 가져오기 연결!");
  const resetData = () => alert("다음 단계에서 초기화/복구 로직 연결!");
  const changePassword = () => alert("다음 단계에서 비밀번호 변경 연결!");

  return (
    <div className="SettingsGrid">
      {/* 운영 설정 */}
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
            <button className="PrimaryBtn" onClick={saveAll} type="button">
              저장
            </button>
            <button
              className="GhostBtn"
              onClick={() => alert("변경사항 취소(다음 단계)")}
              type="button"
            >
              취소
            </button>
          </div>
        </div>
      </section>

      {/* 로그 설정 */}
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
            <button className="PrimaryBtn" onClick={saveAll} type="button">
              저장
            </button>
          </div>
        </div>
      </section>

      {/* 데이터 관리 */}
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
            <button className="GhostBtn" onClick={exportData} type="button">
              내보내기
            </button>
          </div>

          <div className="Field">
            <label className="Label">데이터 가져오기</label>
            <p className="Hint">백업 파일을 업로드하여 복구합니다.</p>
            <button className="GhostBtn" onClick={importData} type="button">
              가져오기
            </button>
          </div>

          <div className="Field DangerBox">
            <label className="Label DangerText">초기화</label>
            <p className="Hint">
              모든 데이터를 초기값으로 되돌립니다. (신중하게)
            </p>
            <button className="DangerBtn" onClick={resetData} type="button">
              전체 초기화
            </button>
          </div>
        </div>
      </section>

      {/* 보안/계정 */}
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
              onClick={changePassword}
              type="button"
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsSections;
