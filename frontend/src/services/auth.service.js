import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
          localStorage.setItem(
            "role",
            JSON.stringify(response.data.data.user.role)
          );
        }

        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  register(user) {
    return axios.post(API_URL + "register", {
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      password: user.password,
      passwordConfirmation: user.passwordConfirmation,
    });
  }
}

export default new AuthService();
