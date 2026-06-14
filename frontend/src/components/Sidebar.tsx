import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen border-r flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Relay</h1>

      <Link to="/home">Home</Link>
      <Link to="/friends">Friends</Link>
      <Link to="/search">Search</Link>
      <Link to="/settings">Settings</Link>

      <hr className="my-4" />

      <h2>Favorites</h2>

      <div>Quil</div>
      <div>Mrds</div>

      <hr className="my-4" />

      <h2>Your Chats</h2>

      <div>Flying Line</div>
      <div>Robuki</div>
      <div>Masof</div>
    </div>
  );
}

export default Sidebar;
