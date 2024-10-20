<!-- src/views/Forum.vue -->
<template>
    <div>
      <h1>Forum Threads</h1>
      <ThreadList />
    </div>
  </template>
  
  <script>
  import ThreadList from '../components/ThreadList.vue';
  
  export default {
    components: { ThreadList },
  };
  </script>