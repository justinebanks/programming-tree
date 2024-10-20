<script setup>
import Axios from "axios";
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");
const msg = ref("");

async function registerUser() {
	// Reset error and success messages
	msg.value = "";

	try {
		const response = await Axios.post("https://localhost:8443/signup", {
			username: username.value,
			email: email.value,
			password: password.value,
			password2: password2.value,
		});

		msg.value = response.data.msg;
		console.log(response.data);

    if (msg.value === 'success') {
      // Redirect to login page
      window.location.href = '/login';
    }

	} catch (error) {
    
		// Handle errors (e.g., validation issues or server problems)
		error.value = error.response
			? error.response.data.message
			: "An error occurred!";
		console.error(error);
	}
}
</script>

<template>
	<div>
		<form @submit.prevent="registerUser">
			<div class="input-container">
				<h1>Register</h1>
				<input
					type="text"
					id="username"
					v-model="username"
					placeholder="Username"
					required
				/>
				<input
					type="email"
					id="email"
					v-model="email"
					placeholder="Email"
					required
				/>
				<input
					type="password"
					id="password"
					v-model="password"
					placeholder="Password"
					required
				/>
				<input
					type="password"
					id="password2"
					v-model="password2"
					placeholder="Confirm Password"
					required
				/>
				<input type="submit" value="Register" />
				<a href="/login">Already registered? Login here</a>
			</div>
		</form>

		<!-- Optionally, display messages -->
		<p v-if="msg">{{ msg }}</p>
	</div>
</template>

<style scoped>
	@import "../assets/account-styling.css";
</style>
