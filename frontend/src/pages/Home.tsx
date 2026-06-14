import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1>Home</h1>
      </div>
    </div>
  );
}

export default Home;
