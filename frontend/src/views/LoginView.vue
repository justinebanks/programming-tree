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
    <h1>Login</h1>
    <form action = "/users/login" method = "POST">
        <div>
            <input type = "text"
                id = "Username"
                name = "Username"
                placeholder = "Username"
                required
            />
        </div>
        <div>
            <input type = "password"
                id =  "password"
                name = "password"
                placeholder = "Password"
            />
        </div>
        <div>
            <input type = "submit" value = "Login"/>

        </div>
        <a href = "/signup">Register</a>
    </form>

</template>

<style scoped>
</style>