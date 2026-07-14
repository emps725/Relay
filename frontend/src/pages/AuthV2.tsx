import { useState } from "react";
import { loginUser, registerUser } from "../services/authServices";
import { checkAuth } from "../services/jwtCheck";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AuthV2() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (mode === "login") {
        await loginUser(login, password);

        await checkAuth();

        navigate("/home");
        setPassword("");
      }

      if (mode === "register") {
        await registerUser(username, email, password);

        alert("Registered successfully.");
        setPassword("");

        setMode("login");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-dark) flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-[60%] items-center justify-center relative overflow-hidden">
        {/* Background Glow */}
        {/* <div className="absolute inset-0 bg-(--bg)" />

        <div className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" /> */}

        {/* Content */}
        <div className="relative z-10 max-w-xl px-12">
          <h1 className="relay-logo text-7xl font-black tracking-tight text-(--text)">
            RELAY
          </h1>

          <p className="relay-text font-semibold mt-2 text-2xl text-(--text)">
            Conversations, without the noise.
          </p>

          <p className="relay-text  text-(--text-muted) leading-relaxed">
            A modern messaging platform built for friends and communities.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-[33%] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <motion.div
            layout
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="rounded-3xl border border-(--border) bg-(--bg-light) backdrop-blur-xl p-8 shadow-2xl"
          >
            {/* TOGGLE */}
            <div className="relative flex bg-(--bg-dark) rounded-full p-1 mb-8">
              <motion.div
                layout
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-(--primary)`}
                style={{
                  left: mode === "login" ? 4 : "50%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />

              <button
                className={`
  relative z-10 flex-1 py-2 transition font-semibold
  ${mode === "login" ? "text-(--bg-dark)" : "text-(--text-muted)"}
`}
                onClick={() => {
                  setMode("login");
                  setPassword("");
                }}
              >
                Sign In
              </button>

              <button
                className={`
  relative z-10 flex-1 py-2 transition font-semibold
  ${mode === "register" ? "text-(--bg-dark)" : "text-(--text-muted)"}
`}
                onClick={() => {
                  setMode("register");
                  setPassword("");
                }}
              >
                Sign Up
              </button>
            </div>

            <h2 className="text-3xl font-bold text-(--text) mb-6">
              {mode === "login" ? "Welcome back" : "Create account"}
            </h2>

            <motion.div layout className="flex flex-col gap-4">
              {mode === "login" ? (
                <motion.div
                  key="login"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex flex-col gap-4"
                >
                  {
                    <>
                      <input
                        type="text"
                        placeholder="Username or Email"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-(--text) outline-none focus:border-(--primary) transition"
                      />

                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-(--text) outline-none focus:border-(--primary) transition"
                      />
                    </>
                  }
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex flex-col gap-4"
                >
                  {
                    <>
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-(--text) outline-none focus:border-(--primary) transition"
                      />

                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-(--text) outline-none focus:border-(--primary) transition"
                      />

                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-(--text) outline-none focus:border-(--primary) transition"
                      />
                    </>
                  }
                </motion.div>
              )}

              <button
                onClick={handleSubmit}
                className="mt-2 rounded-xl bg-(--primary) py-3 font-semibold text-(--bg-dark) transition hover:brightness-110 cursor-pointer"
              >
                {mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AuthV2;
