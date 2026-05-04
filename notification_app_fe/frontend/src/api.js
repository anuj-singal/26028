import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/notifications",
});

export const getNotifications = () => API.get("/");
export const getPriorityNotifications = (n = 10) =>
  API.get(`/priority?n=${n}`);