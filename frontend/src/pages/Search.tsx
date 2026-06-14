import Sidebar from "../components/Sidebar";

function Search() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1>Searching...</h1>
      </div>
    </div>
  );
}

export default Search;
