import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/messages";

// single chat
export const getConversation = async (userId: string) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(`${API_URL}/conversation/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//sending msg
export const sendMessage = async (receiver: string, content: string) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${API_URL}/send`,
    {
      receiver,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

//chat list
export const getConversations = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(`${API_URL}/conversations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
