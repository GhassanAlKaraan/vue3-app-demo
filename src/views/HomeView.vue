<template>
    <div class="home">
        <h1>Welcome to Our App</h1>
        <p>This is the default homepage for our Vue application.</p>
        <router-link to="/cats" class="btn">Browse Cats</router-link>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    components: {},
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped>
.home {
    text-align: center;
    padding: 2rem;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    font-family: inherit;
    font-size: 1rem;
}

.btn:hover {
    background-color: #45a049;
}
</style>
