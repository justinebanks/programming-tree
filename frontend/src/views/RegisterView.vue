<script setup>
  import axios from 'axios';
  import { ref } from "vue";

  const username = ref("");
  const email = ref("");
  const password = ref("");
  const password2 = ref("");
  const msg = ref("");

  async function registerUser() {
        
        // Reset error and success messages
        msg.value = '';
  
        try {

            const response = await axios.post('https://localhost:8443/signup', {
                username: username.value,
                email: email.value,
                password: password.value,
                password2:password2.value

            });
  
            
            msg.value = response.data;
            console.log(response.data);
            
        } catch (error) {
            // Handle errors (e.g., validation issues or server problems)
            error.value = error.response ? error.response.data.message : 'An error occurred!';
            console.error(error);
        }
      }

</script>



<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <div>
          <input 
            type="text"
            id="username"
            v-model="username"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input 
            type="email"
            id="email"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input 
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input 
            type="password"
            id="password2"
            v-model="password2"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
        <a href="/login">Already registered? Login here</a>
      </form>
  
      <!-- Optionally, display messages -->
      <p v-if="msg">{{ msg }}</p>
      
    </div>
</template>
  
  
  