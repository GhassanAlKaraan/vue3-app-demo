<script setup>
import router from "@/router";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const form = reactive({
    name: '',
    breed: '',
    age: 0,
    favoriteToy: ''
});

const state = reactive({ // isLoading variable
    isLoading: false
});

const toast = useToast();


const handleAdd = async () => {
    state.isLoading = true;
    const newCat = {
        name: form.name,
        breed: form.breed,
        age: form.age,
        favoriteToy: form.favoriteToy
    };
    try {
        const response = await fetch(`http://localhost:5000/api/cats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(newCat),
        });
        console.log(response);
        if (response.ok) {
            toast.success('Cat added successfully.');
            router.push('/cats');
        }  else if (response.status === 401 || response.status === 408) {
            toast.error('Please log in first.');
            router.push('/login');
        }else {
            toast.error('Cat could not be added.');
        }
    } catch (error) {
        console.log(error);
    } finally {
        state.isLoading = false;
    }
}

</script>

<template>
    <div class="container">
        <header>
            <h2>Add a new Cat</h2>
        </header>
        <main>
            <form @submit.prevent="handleAdd" class="form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" v-model="form.name" required />
                </div>
                <div class="form-group">
                    <label for="breed">Breed</label>
                    <input type="text" id="breed" name="breed" v-model="form.breed" required />
                </div>
                <div class="form-group">
                    <label for="age">Age</label>
                    <input type="number" id="age" name="age" v-model="form.age" required />
                </div>
                <div class="form-group">
                    <label for="favorite-toy">Favorite Toy</label>
                    <input type="text" id="favorite-toy" name="favorite-toy" v-model="form.favoriteToy" required />
                </div>
                <div class="buttons">
                    <RouterLink to="/cats" class="btn-secondary">Cancel</RouterLink>
                    <div v-if="state.isLoading" class="load-spinner">
                        <PulseLoader />
                    </div>
                    <button v-else type="submit" class="btn">Add</button>
                </div>
            </form>
        </main>
    </div>
</template>

<style scoped>
.container {
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
    /* color: #333; */
    font-size: 24px;
}

.form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 2px;
    /* color: #555; */
    font-weight: 600;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.btn-secondary {
    width: 100%;
    background-color: #181818;
    color: white;
    border: none;
    padding: 0.8rem;
    font-weight: 500;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: center;
}

.btn {
    width: 100%;
    font-family: inherit;
    background-color: #FFFFFF;
    color: black;
    border: none;
    padding: 0.8rem;
    font-weight: 500;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: center;
}

.btn-secondary:hover {
    background-color: #D63A3A;

}

.btn:hover {
    background-color: #53AF50;
    color: white;
}

.buttons {
    display: flex;
    gap: 10px;
}
</style>