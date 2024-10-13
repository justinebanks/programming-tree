<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        password2: '',
        error: '',
        success: ''
      };
    },
    methods: {
      async registerUser() {
        // Basic validation for matching passwords
        if (this.password !== this.password2) {
          this.error = "Passwords do not match!";
          return;
        }
  
        // Reset error and success messages
        this.error = '';
        this.success = '';
  
        try {
            const response = await axios.post('http://localhost:8080/signup', {
                username: this.username,
                email: this.email,
                password: this.password,
            });
  
            // Handle success - You may want to redirect the user after registration
            this.success = 'Registration successful!';
            console.log(response.data);
        } catch (error) {
            // Handle errors (e.g., validation issues or server problems)
            this.error = error.response ? error.response.data.message : 'An error occurred!';
            console.error(error);
        }
      }
    }
  };


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
      <p v-if="error">{{ error }}</p>
      <p v-if="success">{{ success }}</p>
    </div>
</template>
  
  
  