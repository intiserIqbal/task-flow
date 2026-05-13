import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// Service functions to interact with the backend API
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data.tasks;
};

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data; // usually returns the created task object
};

export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data; // usually returns the updated task object
};

export const toggleTask = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/toggle`);
  return response.data; // usually returns the toggled task object
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data; // usually returns a success message or deleted task
};
