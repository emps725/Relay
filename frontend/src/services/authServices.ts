import axios from "axios";

export const loginUser = async (login: string, password: string) => {
  const response = await axios.post("http://localhost:8000/api/v1/auth/login", {
    login,
    password,
  });
  localStorage.setItem("accessToken", response.data.accessToken);
  return response.data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/auth/register",
    {
      username,
      email,
      password,
    },
  );

  return response.data;
};
