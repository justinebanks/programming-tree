<script>
import ThreadList from "../components/ThreadList.vue";
import axios from "axios";

export default {
	components: { ThreadList },
	data() {
		return {
			author: "",
			title: "",
		};
	},
	methods: {
		createThread() {
			axios
				.post("http://localhost:3000/api/forum", {
					author: this.author,
					title: this.title,
				})
				.then((response) => {
					console.log("Thread created successfully!");
					this.author = "";
					this.title = "";
				})
				.catch((error) => {
					console.error(error);
				});
		},
	},
};
</script>

<template>
	<div>
		<h1>Forum Threads</h1>
		<ThreadList />
		<form @submit.prevent="createThread">
			<h1>Create New Thread</h1>
			<input type="text" v-model="author" placeholder="Author Name" required />
			<input type="text" v-model="title" placeholder="Thread Title" required />
			<button type="submit">Create Thread</button>
		</form>
		
	</div>
</template>

<style scoped>

h1 {
	color: white;
}

div {
	display: flex;
	flex-direction: column;
	align-items: center;
}

form {
	display: flex;
	flex-direction: column;
	align-items: center;
}

input[type="text"] {
	width: 300px;
	height: 30px;
	padding-left: 20px;
	border-radius: 30px;
	border: 2px solid black;
	margin: 5px;
	background-color: var(--light-yellow);
}
button {
	width: 250px;
	height: 35px;
	padding-left: 20px;
	border-radius: 30px;
	border: 2px solid black;
	margin: 5px;
	background-color: var(--mid-orange);
	color: white;
}

button:hover {
	background-color: var(--light-orange);
}

</style>