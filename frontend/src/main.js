import { createApp } from 'vue';
import router from './router';
import './style.css';
import App from './App.vue';
import axios from 'axios';  // Import Axios

const app = createApp(App);

// Set default Axios config (optional)
axios.defaults.withCredentials = true;  // Ensure credentials (cookies) are included in requests

// Axios interceptor for handling 401 Unauthorized responses
axios.interceptors.response.use(
  response => response,  // Return the response if it's successful
  error => {
    if (error.response && error.response.status === 401) {
      // If 401 error, redirect to the login page
      router.push('/login');  // Assuming '/login' is your login route
    }
    return Promise.reject(error);  // Always reject the error for further handling if necessary
  }
);

app.use(router);
app.mount('#app');

axios.defaults.baseURL = 'https://localhost:8443';  // Your backend URL
axios.defaults.withCredentials = true;  // Ensure credentials like cookies are sent with every request
