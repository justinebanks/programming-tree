<script setup>

const redirectToSignup = () => {
	window.location.pathname = '/signup';
}

const redirectToAbout = () => {
	window.location.pathname = '/about';
}

</script>

<template>
	<div class="top-section">
		<img class="bg-img" src="../../public/home-bg.jpg" alt="Background Image">
		<h1>Learn To Program More Easily Than Ever Before</h1>
		<p>Learning to program is hard and it's even harder to figure out where to start. The Programming Tree is designed to eliminate this difficulty</p>
		<button @click="redirectToSignup()">Create Account/Register</button>
	</div>

	<div class="section-two">
		<h1>You Success Matters And We Acknowledge That With Our Easy-To-Understand Material</h1>
	</div>

	<div class="section-three reusable-section">
		<div>
			<h1>Progress Through A Tree-Like Structure</h1>
			<p>The tree structure of our app With makes it so that you can focus on actually learning and without having to deal with the complexities of figuring out what you even need to learn and when to learn it.</p>
		</div>
		<img src="https://i.giphy.com/media/dxCT5ok6OM7MS5zAqA/giphy.gif" alt="Tree Image">
	</div>

	<div class="section-four reusable-section">
		<img src="../../public/youtube-img.png" alt="Some Image">
		<div>
			<h1>Find Help From YouTube</h1>
			<p>One of the best ways to teach yourself to program is to lookup YouTube tutorials. That's why we link many of the nodes within our tree to useful YouTube videos and playlists</p>
		</div>
	</div>

	<div class="section-five">
		<img class="code-img" src="../../public/code-img.png" alt="Code Image">
		<button @click="redirectToAbout()">Learn More About Us</button>
	</div>
	
</template>

<style scoped>

* {
	text-align: center;
}

img.bg-img {
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


.section-two {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 200px;
	background-color: var(--mid-green);
}

.section-two > h1 {
	text-align: center;
	font-size: 35px;
	color: white;
	width: 800px;
}


.reusable-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 75vh;
}

.reusable-section > div {
	padding: 20px;
	width: 400px;
	height: 300px;
	background-color: var(--dark-blue);
	border: 2px solid black;
	color: white;
}

.reusable-section > div > h1 {
	text-align: left;
}

.reusable-section > div > p {
	font-size: 18px;
	text-align: left;
	line-height: 27px;
}

.reusable-section > img {
	width: 400px;
	height: 300px;
	border-radius: 50px;
}

.section-four {
	background-color: var(--mid-green);
}

.section-four > div {
	background-color: var(--dark-green);
}

.section-four > img {
	height: 300px;
	width: calc(300px * 1.75);
	border-radius: 0px;
	transform: skewX(10deg) rotateY(10deg);

}


.section-five {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.section-five > img {
	width: 70%;
	border: 2px solid white;
	margin: 40px;
}

.section-five > button {
	width: 350px;
	height: 60px;
	background-color: var(--mid-orange);
	border: 1px solid white;
	color: white;
	border-radius: 50px;
	margin-bottom: 50px;
	font-size: 25px;
	font-weight: bold;
	transition: 0.25s;
}

.section-five > button:hover {
	background-color: var(--light-orange);
	box-shadow: 10px 10px 0px 0px;
	transform: translate(-10px, -10px);
}

</style>
