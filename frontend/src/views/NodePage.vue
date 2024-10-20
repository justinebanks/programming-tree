<script setup>
import { onMounted, ref } from "vue";
import Axios from "axios";
import Code from "../components/Code.vue";

const name = ref("");
const color = ref("");
const parentId = ref("");
const segments = ref([]);
const parents = ref([]); // This will store the names of all parent nodes
const isLoading = ref(true);
const error = ref(null);

// Recursive function to fetch parent nodes
const fetchParentNodes = async (parentId) => {
	try {
		// Stop when parentId reaches 1 (root node)
		if (parentId > 1) {
			const response = await Axios.get(
				`https://localhost:8443/nodes/${parentId}`
			);

			//console.log("Parent node response:", response); // Debug: log parent node response

			// Check if response contains data and access it safely
			if (response.data) {
				const parentNode = response.data;

				// Add the parent name to the parents array
                console.log("Parent Node: ", parentNode.name);
				parents.value.splice(0, 0, parentNode);

				// Recursively fetch the parent of the current parent node
				await fetchParentNodes(parentNode.parentid);
			} else {
				throw new Error("Parent node data is missing");
			}
		}
	} catch (err) {
		console.error("Error fetching parent nodes:", err);
	}
};

const getNodeLink = (node) => {
    if (node.wrapper) {
        return `/tree?id=${node.id}`;
    }
    else {
        return `/node/${node.id}`;
    }
}


onMounted(async () => {
	Axios.defaults.withCredentials = false;

	try {
		let id = window.location.pathname.split("/")[2];

		if (parseInt(id) > 0) {
			const response = await Axios.get(
				`https://localhost:8443/nodes/${id}`
			);

			console.log("Node response:", response); // Debug: log node response

			// Check if response contains data and access it safely
			if (response.data) {
				const nodeData = response.data;

				let segmentData = JSON.parse(decodeURI(nodeData.segments));

				for (let i = 0; i < segmentData.length; i++) {
					segmentData[i] = atob(segmentData[i]);
				}

				// Assign data from the node
				document.title = nodeData.name + " - Programming Tree";
				name.value = nodeData.name;
				color.value = nodeData.color;
				parentId.value = nodeData.parentid;
				segments.value = segmentData;

				// Fetch parent nodes recursively
				await fetchParentNodes(nodeData.parentid);
			} else {
				throw new Error("Node data is missing");
			}
		} else {
			throw new Error("Invalid ID");
		}
	} catch (err) {
		error.value = err.message;
		console.error(err);
	} finally {
		isLoading.value = false;
	}
});
</script>

<template>
    
	<div class="container">
		<h1 v-if="!isLoading && !error" :style="{ backgroundColor: color }">
			{{ name }}
		</h1>
		<h2>
			<a href="/tree">Root</a> > 
            <span v-for="parent in parents">
                <a :href="getNodeLink(parent)">{{ parent.name }}</a> > 
            </span> {{ name }}
		</h2>

		<div v-for="segment in segments">
			<p class="text" v-if="segment.slice(0, 6) == ':text:'">
				{{ segment.slice(6, -1) }}
			</p>
			<!-- <pre v-else-if="segment.slice(0, 6) == ':code:'">
                <code>{{ segment.slice(6, -1) }}</code>
			</pre> -->
            <Code v-else-if="segment.slice(0, 6) == ':code:'">{{ segment.slice(6, -1) }}</Code>
			<p v-else>INVALID SEGMENT</p>
		</div>
	</div>
</template>

<style scoped>

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: black;
	font-family: "Arial", sans-serif;
}

h1 {
	position: absolute;
	top: 15%;
	left: 20px;
	/* background-color: #25562e; */
	color: var(--white);
	padding: 10px 20px;
	border-radius: 5px;
	font-size: 24px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
	position: absolute;
	top: 23%;
	left: 20px;
	color: #73bed3;
	font-size: 18px;
	padding: 5px 10px;
	background-color: var(--dark-blue);
	border-radius: 5px;
	box-shadow: 0 2px 6px var(--light-blue);
}

a {
    color: #73bed3;
}

p {
	text-align: left;
	width: 80vw;
	margin: 5px 0;
	padding: 20px;
	background-color: var(--dark-blue);
	color: white;
	border-radius: 10px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	font-size: 15px;
	line-height: 1.6;
}


</style>
