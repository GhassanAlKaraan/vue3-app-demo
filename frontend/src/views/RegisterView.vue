<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";



const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const toast = useToast();
const state = reactive({ isLoading: false });

const register = async () => {
    state.isLoading = true;
    try {
        console.log(`Name: ${name.value}, Email: ${email.value}, Password: ${password.value}`);

        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
            }),
            credentials: 'include',
        });

        if (response.ok) {
            toast.success('Registration successful!');
            router.push('/');
        }
        else if (response.status === 409) {
            const errorData = await response.json();
            errorMessage.value = errorData.message || 'Email already exists.';
            toast.error(errorMessage.value);
        }
        else {
            const errorData = await response.json();
            errorMessage.value = errorData.message || 'Registration failed. Please try again later.';
            toast.error(errorMessage.value);
        }
    } catch (error) {
        console.error('Register error:', error);
        errorMessage.value = 'An error occurred. Please try again later.';
        toast.error(errorMessage.value);
    } finally {
        state.isLoading = false;
    }
};
</script>

<template>
    <div class="register-container">
        <header>
            <h2>Let's create an account for you</h2>
        </header>
        <main>
            <form class="register-form" @submit.prevent="register">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" v-model="name" required />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" v-model="password" required />
                </div>
                <div v-if="state.isLoading" class="load-spinner">
                    <PulseLoader />
                </div>
                <button v-else type="submit" class="register-button">Register</button>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> <!-- Error message display -->
            </form>
        </main>
    </div>
</template>

<style scoped>
.load-spinner {
    text-align: center;
}

.register-container {
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

.register-form {
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

.register-button {
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

.register-button:hover {
    background-color: #53AF50;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>
