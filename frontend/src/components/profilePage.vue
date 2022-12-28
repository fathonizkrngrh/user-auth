<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.user.username }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser.token.substring(0, 20) }} ...
      {{ currentUser.token.substr(currentUser.token.length - 20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser.user.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.user.email }}
    </p>
    <p>
      <strong>Authorities:</strong>
      {{ currentUser.user.role }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
