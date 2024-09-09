<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const toast = useToast();

const login = async () => {
    try {
        console.log(`Email: ${email.value}, Password: ${password.value}`);

        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
            credentials: 'include',
        });

        if (response.ok) {
            toast.success('Login successful!');
            router.push('/');
        } else {
            const errorData = await response.json();
            errorMessage.value = errorData.message || 'Login failed. Please try again.';
            toast.error(errorMessage.value);
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = 'An error occurred. Please try again later.';
        toast.error(errorMessage.value);
    }
};
</script>

<template>
    <div class="login-container">
        <header>
            <h2>Welcome, please login</h2>
        </header>
        <main>
            <form class="login-form" @submit.prevent="login">
                <div class="form-group">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" v-model="password" required />
                </div>
                <button type="submit" class="login-button">Login</button>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> <!-- Error message display -->
            </form>
        </main>
    </div>
</template>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header {
    text-align: center;
    margin-bottom: 20px;
}

h2 {
    font-size: 24px;
}

.login-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 2px;
    font-weight: 600;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.login-button {
    background-color: #181818;
    color: white;
    border: none;
    padding: 0.8rem;
    font-weight: 500;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.login-button:hover {
    background-color: #53AF50;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>
