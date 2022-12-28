export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("user from local storage:", user);

  if (user.token) {
    // for Node.js Express back-end
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}
