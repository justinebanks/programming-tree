<script setup>
import axios from "axios";
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
		const response = await axios.post(
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
::placeholder {
	color: white;
	opacity: 1; /* Firefox */
}

::-ms-input-placeholder {
	/* Edge 12 -18 */
	color: white;
}

h1 {
	color: white;
}

form {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 75vh;
}

.input-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: var(--mid-green);
	padding: 60px;
	border: 2px solid white;
}

input:not([type="submit"]) {
	width: 250px;
	height: 30px;
	border-radius: 20px;
	border: 2px solid black;
	padding-left: 20px;
	margin: 5px;
	background-color: var(--very-light-green);
}

input[type="submit"] {
	width: 200px;
	height: 35px;
	margin: 20px;
	background-color: var(--mid-orange);
	border: 1px solid black;
	border-radius: 20px;
}

input[type="submit"]:hover {
	background-color: var(--light-yellow);
	cursor: pointer;
}

a {
	color: white;
}
</style>
