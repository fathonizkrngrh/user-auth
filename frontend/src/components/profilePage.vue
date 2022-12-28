<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ userData.username }}</strong> Profile
        <strong v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{ userData.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ userData.email }}
    </p>
    <p>
      <strong>Authorities:</strong>
      {{ userData.role }}
    </p>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "UserBoard",
  data() {
    return {
      userData: "",

      errorMessage: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        console.log("response:", response.data.data.user);
        this.userData = response.data.data.user;
      },
      (error) => {
        this.errorMessage =
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
