<script setup>
import { onMounted, ref } from "vue";
import Axios from "axios";

const name = ref("");
const color = ref("");
const parentId = ref("");
const parents = ref([]); // This will store the names of all parent nodes
const isLoading = ref(true);
const error = ref(null);

// Recursive function to fetch parent nodes
const fetchParentNodes = async (parentId) => {
  try {
    // Stop when parentId reaches 1 (root node)
    if (parentId > 1) {
      const response = await Axios.get(`http://localhost:8080/nodes/${parentId}`);
      
      console.log("Parent node response:", response); // Debug: log parent node response

      // Check if response contains data and access it safely
      if (response.data) {
        const parentNode = response.data;

        // Add the parent name to the parents array
        parents.value.push(parentNode.name);

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

onMounted(async () => {
  try {
    let id = window.location.pathname.split("/")[2];

    if (parseInt(id) > 0) {
      const response = await Axios.get(`http://localhost:8080/nodes/${id}`);
      
      console.log("Node response:", response); // Debug: log node response

      // Check if response contains data and access it safely
      if (response.data) {
        const nodeData = response.data; 

        // Assign data from the node
        name.value = nodeData.name;
        color.value = nodeData.color;
        parentId.value = nodeData.parentid;


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
    <h1 v-if="!isLoading && !error" :style="{ backgroundColor: color }">{{ name }}</h1>
    <h2 v-if="parents.length">Root > {{ parents.join(' > ') }} > {{ name }}</h2>
    <h2 v-else>{{ name }}</h2>


    
    <p>
      "The quick brown fox jumps over the lazy dog" is an English-language pangram – a sentence
      that contains all the letters of the alphabet. The phrase is commonly used for touch-typing
      practice, testing typewriters and computer keyboards, displaying examples of fonts, and
      other applications involving text where the use of all letters in the alphabet is desired.
    </p>
    <p>Parent ID: {{ parentId }}</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #10141f;
  font-family: 'Arial', sans-serif;
}

h1 {
  position: absolute;
  top: 15%;
  left: 20px;
  background-color: #25562e;
  color: #a8ca58;
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
  background-color: #253a5e;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

p {
  text-align: center;
  width: 80%;
  margin: 20px 0;
  padding: 20px;
  background-color: #394a50;
  color: #c7cfcc;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  line-height: 1.6;
}

</style>
