import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const blogs = response.data;
  blogs.sort((a, b) => b.likes - a.likes);

  return blogs;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (args) => {
  const blogData = args[0];
  const blogID = args[1];
  const response = await axios.put(`${baseUrl}/${blogID}`, blogData);
  return response.data;
};

const deleteBlog = async (blogID) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${blogID}`, config);
};

const comment = async (args) => {
  const blogID = args[0];
  const comment = args[1];

  const response = await axios.post(`${baseUrl}/${blogID}/comments`, comment);
  return response.data;
};

export default { getAll, create, setToken, update, deleteBlog, comment };
