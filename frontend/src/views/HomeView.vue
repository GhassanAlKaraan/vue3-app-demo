<template>
    <div class="home">
        <h1>Welcome to Our App</h1>
        <p>This is the default homepage for our Vue application.</p>
        <router-link to="/cats" class="btn">Browse Cats</router-link>
        <br><br>
        <button @click="logout" class="logout">Logout</button>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
const router = useRouter();

const toast = useToast();

const logout = async () => {
    try {

        // Send a logout request to the server
        const response = await fetch('http://localhost:5000/api/users/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            toast.success('Logout successful!');
            router.push('/login');
        } else if (response.status === 408) {
            toast.error('Request timeout, please try again later.');
        }

        else {
            toast.error('Logout failed, please try again later.');
        }
    } catch (error) {
        console.error('Logout failed:', error);
        toast.error('Logout failed, please try again.');
    }
};
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

.logout {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: red;
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    font-family: inherit;
    font-size: 1rem;
}

.btn:hover {
    background-color: #45a049;
}

.logout:hover {
    background-color: darkred;
}
</style>
