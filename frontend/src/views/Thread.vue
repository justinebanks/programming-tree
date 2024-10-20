<!-- src/views/Thread.vue -->
<template>
    <div>
      <h1>{{ thread.title }}</h1>
      <p>Started by {{ thread.author }} on {{ thread.created_at }}</p>
  
      <div v-for="post in posts" :key="post.id" class="post">
        <p><strong>{{ post.author }}</strong>: {{ post.content }}</p>
      </div>
  
      <PostForm :threadId="threadId" @postAdded="fetchPosts" />
    </div>
  </template>
  
  <script>
  import PostForm from '../components/PostForm.vue';
  
  export default {
    props: ['id'],
    data() {
      return {
        thread: {},
        posts: [],
        threadId: this.id,
      };
    },
    methods: {
      async fetchPosts() {
        const threadResponse = await fetch(`https://localhost:8443/api/threads/${this.threadId}`);
        this.thread = await threadResponse.json();
  
        const postsResponse = await fetch(`https://localhost:8443/api/threads/${this.threadId}/posts`);
        this.posts = await postsResponse.json();
      },
    },
    mounted() {
      this.fetchPosts();
    },
    components: {
      PostForm,
    },
  };
  </script>