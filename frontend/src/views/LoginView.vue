<script setup>

defineProps({
    createAccount: Boolean
})

function submitCredentials() {
    if (createAccount) {
        // Create Account
    }

    else {
        // Login User
    }
}

</script>

<template>
    <div>
        <h1 v-if="createAccount">Sign Up</h1>
        <h1 v-else>Login</h1>

        <input type="text" placeholder="Enter Username">
        <input type="text" placeholder="Enter Password">
        <button @click="submitCredentials()">Submit</button>
    </div>

</template>

<style scoped>
    h1 {
        color: white;
        font-size: 40px;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /*border: 2px solid red;*/
        height: 500px;
    }

    input[type="text"] {
        width: 350px;
        height: 35px;
        margin-bottom: 30px;
        background-color: rgba(255, 255, 255, 0.4);
        color: white;
        font-weight: bold;
        font-size: 15px;
        padding: 5px;
        padding-left: 40px;
    }

    button {
        width: 350px;
        height: 45px;
        border-radius: 20px;
        border: 2px solid black;
        color: white;
        font-size: 15px;
        background-color: rgba(255, 255, 255, 0.4);
        font-weight: bold;
    }

    button:hover {
        background-color: rgba(255, 255, 255, 0.6);
    }
</style>