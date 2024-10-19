<script setup>
import axios from 'axios';
import { ref } from "vue";

// Define form field refs
const username = ref("");
const password = ref("");
const msg = ref("");

async function registerUser(event) {
    // Prevent form from reloading the page
    event.preventDefault();
    
    // Reset error and success messages
    msg.value = '';

    try {
        // Send POST request to the backend login endpoint
        const response = await axios.post('https://localhost:8443/login', {
            username: username.value,
            password: password.value, // Only username and password for login
        });

        msg.value = response.data;
        console.log(response.data);

    } catch (error) {
        // Handle errors (e.g., validation issues or server problems)
        msg.value = error.response ? error.response.data.msg : 'An error occurred!';
        console.error(error);
    }
}
</script>

<template>
    <form @submit="registerUser"> <!-- Trigger registerUser function on form submission -->
        <div>
            <input type="text"
                id="username"
                name="username"
                v-model="username"
                placeholder="Username"
                required
            />
        </div>
        <div>
            <input type="password"
                id="password"
                name="password"
                v-model="password" 
                placeholder="Password"
                required
            />
        </div>
        <div>
            <input type="submit" value="Login"/>
        </div>
        <a href="/signup">Register</a>
    </form>

    <!-- Display the success/error message -->
    <p>{{ msg }}</p>
</template>

<style scoped>
/* Add your styles here */
</style>
