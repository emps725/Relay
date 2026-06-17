import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import UserCard from "../components/UserCard";
import { getUsers } from "../services/userService";

type User = {
  _id: string;
  username: string;
};

function Search() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers =
    search.trim() === ""
      ? []
      : users.filter((user) =>
          user.username.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Search</h1>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-2xl px-4 py-3 mb-6"
        />

        <div className="flex flex-col gap-4">
          {search.trim() === "" && (
            <p>Search for a user to start a conversation.</p>
          )}
          {filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              userId={user._id}
              username={user.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
