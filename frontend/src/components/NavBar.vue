<template>
	<div class="nav-bar">
		<p>Programming Tree</p>
		<a href="/">Home</a>
		<a href="/tree">Tree</a>
		<a href = "/forum">Forums</a>
		<a href="/about">About</a>
		<a class="holy-btn" href="/login">Login</a>
		<a class="holy-btn" href="/signup">Sign Up</a>
	</div>
</template>

<style scoped>
.nav-bar {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: end;
	border-bottom: 2px solid black;
}

p {
	color: white;
	font-size: 30px;
	margin-right: auto;
	margin-left: 10px;
	padding: 10px;
}

a {
	border: 2px solid white;
	padding: 20px;
	margin-right: 20px;
	text-decoration: none;
	color: white;
	transition: 0.5s;
}

a.holy-btn {
	background-color: var(--mid-orange);
}

a:hover {
	color: black;
	background-color: white;
}
</style>
