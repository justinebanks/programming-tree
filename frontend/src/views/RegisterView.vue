<script setup>
  import axios from 'axios';
  import { ref } from "vue";

  const username = ref("");
  const email = ref("");
  const password = ref("");
  const password2 = ref("");
  const msg = ref("");

  axios.defaults.withCredentials = true;

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

::placeholder {
  color: white;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Edge 12 -18 */
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
  