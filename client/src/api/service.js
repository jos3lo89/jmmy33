import axiosI from "./axios";

// listar usuario
export const getAllUsers = async () => {
  return await axiosI.get("/users");
};

// login user
export const loginUsers = async (data) => {
  return await axiosI.post("/users/login", data);
};

// cerra sesión
export const logoutUser = async () => {
  return await axiosI.post("/users/logout");
};

// registrar usuario
export const registerUser = async (data) => {
  return await axiosI.post("/users", data);
};

// delete user
export const deleteUser = async (id) => {
  return await axiosI.delete(`/users/${id}`);
};

// pedir usuario por id
export const findUserById = async (id) => {
  return await axiosI.get(`/users/${id}`);
};

// update user
export const updateUser = async (id, data) => {
  return await axiosI.put(`/users/${id}`, data);
};

// update Foto user
export const updateFotoUser = async (id, data) => {
  return await axiosI.put(`/users/foto/${id}`, data);
};
