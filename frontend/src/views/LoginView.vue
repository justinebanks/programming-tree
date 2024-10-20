<script setup>
import Axios from "axios";
import { ref } from "vue";

// Define form field refs
const username = ref("");
const password = ref("");
const msg = ref("");

async function loginUser(event) {
	// Prevent form from reloading the page
	event.preventDefault();

	// Reset error and success messages
	msg.value = "";
	
	try {
		// Send POST request to the backend login endpoint
		const response = await Axios.post(
    		'https://localhost:8443/login',
    		{ username: username.value, password: password.value },
    		{ withCredentials: true }
		);

		msg.value = response.data.msg;
		console.log(response.data.msg + " User: " + response.data.user);
        if (msg.value === 'Authenticated') {
            if (response.headers['set-cookie']) {
			// Set the cookies in the document
				document.cookie = response.headers['set-cookie'][0];
			}
			// Redirect to the dashboard
			window.location.href = '/dashboard';
        }
	} catch (error) {
		// Handle errors (e.g., validation issues or server problems)
		msg.value = error.response
			? error.response.data.msg
			: "An error occurred!";
		console.error(error);
	}
}
</script>

<template>
	<form @submit="loginUser">
		
		<div class="input-container">
			<h1>Log In</h1>
			<input
				type="text"
				id="username"
				name="username"
				v-model="username"
				placeholder="Username"
				required
			/>

			<input
				type="password"
				id="password"
				name="password"
				v-model="password"
				placeholder="Password"
				required
			/>

			<input type="submit" value="Login" />
			<a href="/signup">Don't Have An Account? Register</a>
		</div>
	</form>

	<!-- Display the success/error message -->
	<p>{{ msg }}</p>
</template>

<style scoped>
    @import "../assets/account-styling.css";
</style>
