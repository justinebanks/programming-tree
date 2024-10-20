<template>
    <div>
      <h1>Forum Threads</h1>
      <form @submit.prevent="createThread">
        <input type="text" v-model="author" placeholder="Name" required>
        <input type = "text" v-model="title" placeholder="Title" required>
        <button type="submit">Create Thread</button>
      </form>
      <ThreadList />
    </div>
  </template>
  
<script>
  import ThreadList from '../components/ThreadList.vue';
  import axios from 'axios';
  
  export default {
    components: { ThreadList },
    data() {
      return {
        author: '',
        title: '',
      };
    },
    methods: {
      createThread() {
        axios.post('https://localhost:8443/api/forum', {
          author: this.author,
          title: this.title,
        })
        .then((response) => {
          console.log('Thread created successfully!');
          this.author = '';
          this.title = '';
        })
        .catch((error) => {
          console.error(error);
        });
      },
    },
  };
  </script>