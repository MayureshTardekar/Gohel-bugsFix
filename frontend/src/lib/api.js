import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const registerUser = (payload) => api.post("/register", payload).then(r => r.data);
export const loginUser = (wallet) => api.post("/login", { wallet_address: wallet }).then(r => r.data);
export const getUser = (wallet) => api.get(`/user/${wallet}`).then(r => r.data);
export const completeTasks = (wallet, tasks) => api.post("/tasks/complete", { wallet_address: wallet, tasks }).then(r => r.data);
export const getQuestions = () => api.get("/questions").then(r => r.data);
export const submitTest = (wallet, answers) => api.post("/test/submit", { wallet_address: wallet, answers }).then(r => r.data);
export const getLeaderboard = () => api.get("/leaderboard").then(r => r.data);
export const getReferrals = (wallet) => api.get(`/referrals/${wallet}`).then(r => r.data);
export const getArchive = () => api.get("/archive").then(r => r.data);

export const adminLogin = (username, password) => api.post("/admin/login", { username, password }).then(r => r.data);
export const adminGetUsers = (token) => api.get("/admin/users", { headers: { "X-Admin-Token": token } }).then(r => r.data);
export const adminGetQuestions = (token) => api.get("/admin/questions", { headers: { "X-Admin-Token": token } }).then(r => r.data);
export const adminAddQuestion = (token, q) => api.post("/admin/questions", q, { headers: { "X-Admin-Token": token } }).then(r => r.data);
export const adminDeleteQuestion = (token, id) => api.delete(`/admin/questions/${id}`, { headers: { "X-Admin-Token": token } }).then(r => r.data);
