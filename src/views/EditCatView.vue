<script setup>
import router from "@/router";
import { reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

// State
const form = reactive({ // variable for the fields in the form
    name: '',
    breed: '',
    age: 0,
    favoriteToy: ''
});
const state = reactive({ // isLoading variable
    isLoading: true
});
const catId = router.currentRoute.value.params.id; // id from params
//

const toast = useToast();

const fetchDetails = async () => {
    try {
        const response = await fetch(`http://localhost:5000/cats/${catId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const text = await response.text(); // Read as text to check content
        console.log(text); // Log the raw response
        if (response.ok) {
            const cat = JSON.parse(text); // Parse only if valid JSON
            form.name = cat.name;
            form.breed = cat.breed;
            form.age = cat.age;
            form.favoriteToy = cat.favoriteToy;
        } else {
            toast.error('Failed to fetch cat details.');
        }
    } catch (error) {
        console.error('Error fetching cat details:', error);
        toast.error('An error occurred while fetching cat details.');
    }
};


const handleSubmit = async () => {
    const updatedCat = {
        name: form.name,
        breed: form.breed,
        age: form.age,
        favoriteToy: form.favoriteToy
    };
    try {
        const response = await fetch(`http://localhost:5000/cats/${catId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCat),
        });
        console.log(response);
        if (response.ok) {
            toast.success('Cat successfully updated.');
            router.push('/cats');
        } else {
            toast.error('Cat could not be updated.');
        }
    } catch (error) {
        console.log(error);
    }
};

onMounted(async () => {
    try {
        await fetchDetails();
    } catch (error) {
        console.log(error);
    } finally {
        state.isLoading = false;
    }
});

</script>


<template>
    <div v-if="state.isLoading" class="load-spinner">
        <PulseLoader />
    </div>
    <section v-else class="container">
        <header>
            <h2>Edit Cat Info</h2>
        </header>
        <main>
            <form @submit.prevent="handleSubmit" class="form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" v-model="cat.name" required />
                </div>
                <div class="form-group">
                    <label for="breed">Breed</label>
                    <input type="text" id="breed" name="breed" v-model="cat.breed" required />
                </div>
                <div class="form-group">
                    <label for="age">Age</label>
                    <input type="number" id="age" name="age" v-model="cat.age" required />
                </div>
                <div class="form-group">
                    <label for="favorite-toy">Favorite Toy</label>
                    <input type="text" id="favorite-toy" name="favorite-toy" v-model="cat.favoriteToy" required />
                </div>
                <div class="buttons">
                    <RouterLink to="/cats" class="btn-secondary">Cancel</RouterLink>
                    <button type="submit" class="btn">Save</button>
                </div>
            </form>
        </main>
    </section>
</template>

<style scoped>
.load-spinner {
    text-align: center;
}

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