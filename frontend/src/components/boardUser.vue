<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ content }}</strong>
        <strong v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </strong>
      </h3>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "UserBoard",
  data() {
    return {
      content: "",

      errorMessage: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data.message;
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
