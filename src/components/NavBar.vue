<script setup>

import { RouterLink, useRoute } from "vue-router";
import logo from "@/assets/logo.svg";

const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path === routePath;
}

</script>

<template>

    <nav>
        <RouterLink to="/">
            <div class="logo">
                <img :src="logo" alt="Logo" />
            </div>
        </RouterLink>
        <div class="links">
            <ul>
                <RouterLink to="/" :class="{ active: isActiveLink('/') }">
                    <li>Home</li>
                </RouterLink>
                <RouterLink to="/cats" :class="{ active: isActiveLink('/cats') }">
                    <li>Cats</li>
                </RouterLink>
                <RouterLink to="/login" :class="{ active: isActiveLink('/login') }">
                    <li>Login</li>
                </RouterLink>
            </ul>
        </div>
    </nav>

</template>

<style scoped>
.logo {
    height: 40px;
    width: 40px;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

ul {
    display: flex;
    gap: 1rem;
    list-style: none;
}

li {
    font-size: 18px;
}

a {
    background: none;
}

.active {
    color: white;
}

a:hover {
    color: white;
}
</style>