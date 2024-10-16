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
        <div class="top-text">
            <h1>{{ title }}</h1>
            <p>{{ text }}</p>
            <button @click="redirectToSignup()">Create Account/Register</button>
        </div>
        <img src="https://i.giphy.com/media/dxCT5ok6OM7MS5zAqA/giphy.gif" alt="Image">

        <div>
            <p>Easily learn programming without the need for a college degree</p>
        </div>
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

    div.top-text {
        /* border: 2px solid black; */
        width: 500px;
    }

    .top-text > h1 {
        color: white;
        font-size: 50px;
    }

    .top-text > p {
        color: white;
        font-size: 20px;
    }

    .top-text > button {
        width: 300px;
        height: 40px;
        font-size: 15px;
        border-radius: 5px;
        border: 1px solid black;
        background-color: var(--light-orange);
        font-weight: bold;
        margin-bottom: 40px;
    }

    .top-text > button:hover {
        background-color: var(--light-yellow);
    }

    img {
        border-radius: 50%;
        border: 2px solid var(--fav-color);
        box-shadow: 50px 50px 50px;
    }


</style>