<!-- src/views/Thread.vue -->
<template>
    <div>
      <h1>{{ thread.title }}</h1>
      <p>Started by {{ thread.author }} on {{ thread.created_at }}</p>
  
      <!-- Post form to add new posts -->
      <form @submit.prevent="submitPost">
        <div>
          <input
            type="text"
            v-model="newPostAuthor"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <textarea
            v-model="newPostContent"
            placeholder="Write a reply..."
            required
          ></textarea>
        </div>
        <button type="submit">Post Reply</button>
      </form>
  
      <!-- Display the posts -->
      <div v-for="post in posts" :key="post.id" class="post">
        <p><strong>{{ post.author }}</strong>: {{ post.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['id'],
    data() {
      return {
        thread: {},
        posts: [],
        newPostContent: '',
        newPostAuthor: '', // For storing the author's name
        threadId: parseInt(this.id),
      };
    },
    methods: {
      async fetchPosts() {
        try {
          // Fetch the thread data
          const threadResponse = await axios.get(`https://localhost:8443/api/threads/${this.threadId}`);
          this.thread = threadResponse.data;
  
          // Fetch the posts for the thread
          const postsResponse = await axios.get(`https://localhost:8443/api/threads/${this.threadId}/posts`);
          this.posts = postsResponse.data;
        } catch (error) {
          console.error('Error fetching posts or thread:', error);
        }
      },
      async submitPost() {
        if (!this.newPostContent.trim() || !this.newPostAuthor.trim()) return;
  
        try {
          // Send a POST request to add a new post
          await axios.post(`https://localhost:8443/api/threads/${this.threadId}/posts`, {
            author: this.newPostAuthor, // Include the author's name
            content: this.newPostContent, // Include the post content
          });
  
          // Clear the input fields and refresh posts
          this.newPostAuthor = '';
          this.newPostContent = '';
          this.fetchPosts();
        } catch (error) {
          console.error('Error submitting post:', error);
        }
      },
    },
    mounted() {
      this.fetchPosts();
    },
  };
  </script>
  
  <style scoped>
  /* Style for the post form */
  form {
    margin-bottom: 20px;
  }
  
  input, textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .post {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .post p {
    margin: 5px 0;
  }
  </style>
  