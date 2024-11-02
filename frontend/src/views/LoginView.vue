<template>
	<div class="login-view">
	  <h2>Login</h2>
	  <form @submit.prevent="login">
		<div>
		  <label for="username">Username:</label>
		  <input type="text" v-model="username" id="username" required>
		</div>
		<div>
		  <label for="password">Password:</label>
		  <input type="password" v-model="password" id="password" required>
		</div>
		<button type="submit">Login</button>
	  </form>
	  <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
	</div>
  </template>
  
  <script>
  import axios from 'axios'; // Import Axios
  
  export default {
	data() {
	  return {
		username: '',
		password: '',
		errorMessage: ''
	  };
	},
	methods: {
	  async login() {
		try {
		  // Use axios to send the login request
		  const response = await axios.post('http://localhost:3000/login', { username: this.username, password: this.password });
		  if (response.data.msg === 'Login successful') {
			const user = response.data.user;
			console.log(`Login successful: User ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`);
			
			// Store token or user info as needed (e.g., using Vuex)
			this.$store.dispatch('login', user); // Correctly dispatch the Vuex action
			
			this.$router.push({ name: 'dashboard' }); // Redirect to dashboard
		  } else {
			this.errorMessage = response.data.error || 'Login failed. Please try again.';
			console.error(response.data.error);
		  }
		} catch (err) {
		  this.errorMessage = 'An error occurred during login. Please try again later.';
		  console.error("Error during login", err);
		}
	  }
	}
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  .error {
	color: red;
  }
  </style>
  