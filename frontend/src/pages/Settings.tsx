import Sidebar from "../components/Sidebar";

function Settings() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1>Settings</h1>
      </div>
    </div>
  );
}

export default Settings;
