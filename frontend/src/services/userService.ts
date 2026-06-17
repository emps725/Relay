import axios from "axios";

export const getUsers = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(`http://localhost:8000/api/v1/users/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getUserById = async (userId: string) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `http://localhost:8000/api/v1/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
