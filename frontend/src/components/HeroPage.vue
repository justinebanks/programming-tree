<script setup>

defineProps({
    title: {
        type: String,
        default: "Hello World"
    },
    text: {
        type: String,
        default: "Lorem ipsum dolor"
    }
});

const redirectToSignup = () => {
    window.location.pathname = '/signup';
}

</script>

<template>
    <div class="container">
        <div class="text">
            <h1>{{ title }}</h1>
            <p>{{ text }}</p>
            <button @click="redirectToSignup()">Create Account</button>
        </div>
        <img src="https://i.giphy.com/media/dxCT5ok6OM7MS5zAqA/giphy.gif" alt="Image">
    </div>
</template>

<style scoped>
    div.container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 2px solid var(--fav-color);
        height: 500px;
    }

    div.text {
        /* border: 2px solid black; */
        width: 500px;
    }

    img {
        border-radius: 50%;
        border: 2px solid var(--fav-color);
        box-shadow: 50px 50px 50px;
    }

    h1 {
        color: white;
        font-size: 50px;
    }

    p {
        color: white;
        font-size: 20px;
    }

    button {
        width: 300px;
        height: 40px;
        font-size: 15px;
        border-radius: 5px;
        border: 1px solid black;
        background-color: rgba(255, 255, 255, 0.5);
        font-weight: bold;
    }

    button:hover {
        background-color: rgba(255, 255, 255, 0.8);
    }
</style>