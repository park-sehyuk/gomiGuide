import {
  SettingsHeader,
  SettingsSections,
} from "../../components/adminSettingsPage";
import "./AdminSettingsPage.css";

const AdminSettingsPage = () => {
  return (
    <div className="AdminSettings">
      <SettingsHeader />
      <SettingsSections />
    </div>
  );
};

export default AdminSettingsPage;
