export default function authHeader() {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("user from local storage:", token);

  if (token) {
    // for Node.js Express back-end
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
