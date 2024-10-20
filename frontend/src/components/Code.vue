<script setup>

import { onMounted } from 'vue';
// defineProps(["text"])

onMounted(() => {
    hljs.highlightAll();
})

</script>

<template>
    <pre><code>
<slot></slot>
    </code></pre>
</template>

<style scoped>

code {
    padding: 100px;
    border-radius: 20px;
    width: 80vw;
}

</style>