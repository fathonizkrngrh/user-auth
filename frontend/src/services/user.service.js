import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "me", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin/me", { headers: authHeader() });
  }
}

export default new UserService();
