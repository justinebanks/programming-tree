<!-- src/components/ThreadList.vue -->
<script>
export default {
	data() {
		return {
			threads: [],
		};
	},
	async mounted() {
		const response = await fetch("http://localhost:3000/api/threads"); // Adjust URL to match your backend
		this.threads = await response.json();
	},
};
</script>

<template>
	<div>
		<!-- <router-link :to="`/thread/${thread.id}`">{{ thread.title }} by {{ thread.author }}</router-link> -->
		<a v-for="thread in threads" :key="thread.id" :href="'/thread/' + thread.id">{{ thread.title }} by {{ thread.author }}</a>
	</div>
</template>

<style scoped>

div {
	border: 2px solid green;
}

div {
	border: 2px solid white;
	background-color: var(--mid-green);
	padding: 20px;
}

a {
	width: 300px;
	color: white;
	margin: 10px;
}


</style>
