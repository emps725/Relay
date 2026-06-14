import { useState } from "react";
import { loginUser, registerUser } from "../services/authServices.ts";
import { checkAuth } from "../services/jwtCheck.ts";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 border p-8 rounded-2xl">
        <h1>Relay</h1>
        <div className="flex gap-1">
          <button
            className={
              mode === "login"
                ? "bg-gray-800 text-white p-2"
                : "bg-gray-200 text-black p-2"
            }
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={
              mode === "register"
                ? "bg-gray-800 text-white p-2"
                : "bg-gray-200 text-black p-2"
            }
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>
        {mode === "login" && (
          <div className="flex flex-col gap-2 w-80">
            <input
              className="outline"
              placeholder="Username/Email"
              type="text"
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              className="outline"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {mode === "register" && (
          <div className="flex flex-col gap-2 w-80">
            <input
              className="outline"
              placeholder="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="outline"
              placeholder="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="outline"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <button
          className="border p-1"
          onClick={async () => {
            if (mode === "login") {
              const data = await loginUser(login, password);
              console.log(data);
              const jwtData = await checkAuth();
              console.log(jwtData);
              alert("Login successful");
              navigate("/home");
            }
            if (mode === "register") {
              const data = await registerUser(username, email, password);
              console.log(data);
              alert("Registered successfully.");
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Auth;
