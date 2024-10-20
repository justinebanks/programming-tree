<template>
  <div>
    <h3>Add a new post</h3>
    <form>
      <input v-model="author" type="text" placeholder="Your Name" required />
      <textarea v-model="content" placeholder="Write your post here..." required></textarea>
      <button type="submit">Post</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    threadId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const author = ref('');
    const content = ref('');

    const submitPost = async () => {
      const newPost = {
        thread_id: props.threadId,
        author: author.value,
        content: content.value,
      };

      await fetch(`https://localhost:8443/api/threads/${props.threadId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      console.log("Posted")

      // Clear form fields after submission
      author.value = '';
      content.value = '';

      // Emit an event to update parent component's state
      // You can add a callback function on the parent component to listen to this event
      // For example: this.$emit('postAdded');
    };

    return {
      author,
      content,
      submitPost,
    };
  },
});
</script>

<style scoped>
/* Add any specific styles for your component here */
</style>
