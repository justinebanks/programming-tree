<script setup>

const redirectToSignup = () => {
	window.location.pathname = '/signup';
}

</script>

<template>
	<div class="top-section">
		<img src="../../public/home-bg.jpg" alt="Background Image">
		<h1>Learn To Program More Easily Than Ever Before</h1>
		<p>Learning to program is hard and it's even harder to figure out where to start. The Programming Tree is designed to eliminate this difficulty</p>
		<button @click="redirectToSignup()">Create Account/Register</button>
	</div>
	<div class="section-two">
		<p>Hello World</p>
	</div>
	<!-- <img src="https://i.giphy.com/media/dxCT5ok6OM7MS5zAqA/giphy.gif" alt="Image"> -->
</template>

<style scoped>

* {
	text-align: center;
}

img {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -10;
	opacity: 0.4;
}

.top-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100vh;
}

.top-section > h1 {
	color: white;
	font-size: 50px;
	width: 600px;
}

.top-section > p {
	color: white;
	font-size: 20px;
	width: 600px;
}

.top-section > button {
	width: 250px;
	height: 50px;
	font-size: 15px;
	border-radius: 5px;
	border: 1px solid black;
	color: white;
	background-color: var(--light-green);
	font-weight: bold;
	margin-bottom: 40px;
	transition: 0.25s;
}

.top-section > button:hover {
	background-color: var(--mid-green);
}



</style>
