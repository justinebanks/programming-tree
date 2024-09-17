<script setup>
	import { ref } from "vue";

	const message = ref("Hello World");

	const changeMsg = () => {
		message.value = "New Message";
	}
</script>

<template>
	<div>
		<p>{{ message }}</p>
		<button @click="changeMsg()">Change Message</button>
	</div>
</template>

<style scope></style>
