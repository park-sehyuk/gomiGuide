import { useState } from "react";
import OpsSettingsSection from "./sections/OpsSettingsSection";
import LogSettingsSection from "./sections/LogSettingsSection";
import DataManagementSection from "./sections/DataManagementSection";
import SecuritySection from "./sections/SecuritySection";
import "./SettingsSections.css";

const SettingsSections = () => {
  // 운영 설정
  const [language, setLanguage] = useState("ko");
  const [holidayRule, setHolidayRule] = useState("next");

  // 로그 설정
  const [logEnabled, setLogEnabled] = useState(true);
  const [logRetentionDays, setLogRetentionDays] = useState(30);

  // 보안/계정
  const [adminName, setAdminName] = useState("admin");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");

  // ✅ UI-only actions (다음 단계에서 실제 API 연결)
  const saveAll = () => alert("다음 단계에서 설정 저장(API/DB) 연결!");
  const exportData = () =>
    alert("다음 단계에서 데이터 내보내기(JSON/CSV) 연결!");
  const importData = () => alert("다음 단계에서 데이터 가져오기 연결!");
  const resetData = () => alert("다음 단계에서 초기화/복구 로직 연결!");
  const changePassword = () => alert("다음 단계에서 비밀번호 변경 연결!");
  const cancel = () => alert("변경사항 취소(다음 단계)");

  return (
    <div className="SettingsGrid">
      <OpsSettingsSection
        language={language}
        setLanguage={setLanguage}
        holidayRule={holidayRule}
        setHolidayRule={setHolidayRule}
        onSave={saveAll}
        onCancel={cancel}
      />

      <LogSettingsSection
        logEnabled={logEnabled}
        setLogEnabled={setLogEnabled}
        logRetentionDays={logRetentionDays}
        setLogRetentionDays={setLogRetentionDays}
        onSave={saveAll}
      />

      <DataManagementSection
        onExport={exportData}
        onImport={importData}
        onReset={resetData}
      />

      <SecuritySection
        adminName={adminName}
        setAdminName={setAdminName}
        currentPw={currentPw}
        setCurrentPw={setCurrentPw}
        newPw={newPw}
        setNewPw={setNewPw}
        newPw2={newPw2}
        setNewPw2={setNewPw2}
        onChangePassword={changePassword}
      />
    </div>
  );
};

export default SettingsSections;
