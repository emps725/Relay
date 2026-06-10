import axios from "axios";

export const checkAuth = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get("http://localhost:8000/api/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
