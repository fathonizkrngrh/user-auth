<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ userData.username }}</strong> Profile
      </h3>
    </header>
    <!-- <p>
      <strong>Token:</strong>
      {{ userData.data.token.substring(0, 20) }} ...
      {{ userData.data.token.substr(userData.data.token.length - 20) }}
    </p>
    <p>
      <strong>Message:</strong>
      {{ userData.data.message }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ userData.data.user.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ userData.data.user.email }}
    </p>
    <p>
      <strong>Authorities:</strong>
      {{ userData.data.user.role }}
    </p> -->
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "UserBoard",
  data() {
    return {
      userData: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.userData = response.data.data.user;
      },
      (error) => {
        this.userData =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
