<template>
  <div v-if="user">
    <h2>Welcome, {{ user.username }}!</h2>
    <p>Your email: {{ user.email }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/dashboard');
      if (response.data.msg === 'Authenticated') {
        this.user = response.data.user;
      } else {
        console.error('Unauthorized access');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
