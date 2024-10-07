<script setup>

// defineProps({
//     text: String,
//     id: Number,
//     color: String
// });

</script>

<template>
    <h1>Node Page</h1>
    <div>
        <p>{{ $route.params.id }}</p>
    </div>
</template>

<style scoped>

</style>