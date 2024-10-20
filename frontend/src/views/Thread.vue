<!-- src/views/Thread.vue -->
<script>
import axios from "axios";

export default {
	props: ["id"],
	data() {
		return {
			thread: {},
			posts: [],
			newPostContent: "",
			newPostAuthor: "", // For storing the author's name
			threadId: parseInt(this.id),
		};
	},
	methods: {
		async fetchPosts() {
			try {
				// Fetch the thread data
				const threadResponse = await axios.get(
					`https://localhost:8443/api/threads/${this.threadId}`
				);
				this.thread = threadResponse.data;

				// Fetch the posts for the thread
				const postsResponse = await axios.get(
					`https://localhost:8443/api/threads/${this.threadId}/posts`
				);
				this.posts = postsResponse.data;
			} catch (error) {
				console.error("Error fetching posts or thread:", error);
			}
		},
		async submitPost() {
			if (!this.newPostContent.trim() || !this.newPostAuthor.trim())
				return;

			try {
				// Send a POST request to add a new post
				await axios.post(
					`https://localhost:8443/api/threads/${this.threadId}/posts`,
					{
						author: this.newPostAuthor, // Include the author's name
						content: this.newPostContent, // Include the post content
					}
				);

				// Clear the input fields and refresh posts
				this.newPostAuthor = "";
				this.newPostContent = "";
				this.fetchPosts();
			} catch (error) {
				console.error("Error submitting post:", error);
			}
		},
	},
	mounted() {
		this.fetchPosts();
	},
};
</script>

<template>
	<div class="container">
		<h1>{{ thread.title }}</h1>
		<p>Started by {{ thread.author }} on {{ thread.created_at }}</p>

		<!-- Display the posts -->
		<div v-for="post in posts" :key="post.id" class="post">
				<strong>{{ post.author }}</strong>
				<p>{{ post.content }}</p>
		</div>

		<!-- Post form to add new posts -->
		<form @submit.prevent="submitPost">
			<input type="text" v-model="newPostAuthor" placeholder="Your name" required />
			<textarea v-model="newPostContent" placeholder="Write a reply..." required></textarea>
			<button type="submit">Post Reply</button>
		</form>


	</div>
</template>

<style scoped>
/* Style for the post form */

* {
	color: white;
}

.container {
	padding: 10px;
}


.post {
	padding: 10px;
	border-bottom: 0.5px solid white;
	border-top: 0.5px solid white;
}

.post p {
	margin: 5px 0;
}


form {
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

input, textarea {
	width: 400px;
	margin-bottom: 10px;
	padding: 10px;
	border: 1px solid white;
	border-radius: 4px;
	color: black;
}

button {
	padding: 10px;
	background-color: #007bff;
	color: white;
	border: none;
	cursor: pointer;
}

button:hover {
	background-color: #0056b3;
}

</style>
