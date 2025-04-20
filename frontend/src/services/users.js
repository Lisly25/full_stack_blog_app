import axios from "axios";
const baseUrl = "/api/users";

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  const users = response.data;
  users.sort((a, b) => b.username - a.username);

  return users;
};

export default { getUsers };
