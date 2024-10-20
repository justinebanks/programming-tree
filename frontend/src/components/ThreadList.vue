<!-- src/components/ThreadList.vue -->
<template>
    <div>
      <ul>
        <li v-for="thread in threads" :key="thread.id">
          <router-link :to="`/thread/${thread.id}`">{{ thread.title }} by {{ thread.author }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        threads: [],
      };
    },
    async mounted() {
      const response = await fetch('https://localhost:8443/api/threads');  // Adjust URL to match your backend
      this.threads = await response.json();
    },
  };
  </script>