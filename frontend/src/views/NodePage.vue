<script setup>
import { onMounted, ref } from "vue";
import Axios from "axios";

const name = ref("");
const color = ref("");

onMounted(async () => {
    let id = window.location.pathname.split("/")[2];

    const node = await Axios.get(`http://localhost:8080/nodes/${id}`);
    console.log(node.data);

    name.value = node.data.name;
    color.value = node.data.color;

})

</script>

<template>
    <h1>{{ name }}</h1>
    <div>
        <p>{{ $route.params.id }}</p>
    </div>
</template>

<style scoped>
    h1 {
        background-color: red;
    }
</style>