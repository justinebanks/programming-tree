<template>
  <div v-if="authenticated">
    <h1>Dashboard</h1>
    <p>Welcome, {{ user.username }}!</p>
  </div>
  <div v-else>
    <p>Redirecting to login...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      authenticated: false,
    };
  },
  async mounted() {
    try {
      const response = await axios.get('https://localhost:8443/dashboard', {
        withCredentials: true, // Send session cookie to check authentication
      });

      if (response.data.msg === 'Authenticated') {
        this.authenticated = true;
        this.user = response.data.user; // Get the user data
      } else {
        this.$router.push('/login'); // Redirect to login if not authenticated
      }
    } catch (error) {
      this.$router.push('/login'); // Redirect to login on error
    }
  },
};
</script>