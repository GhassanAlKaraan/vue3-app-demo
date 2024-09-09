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
        const response = await fetch(`http://localhost:5000/api/cats/${catId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (response.ok) {
            const json = await response.json();
            const cat = json.cat;
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


const handleUpdate = async () => {
    const updatedCat = {
        name: form.name,
        breed: form.breed,
        age: form.age,
        favoriteToy: form.favoriteToy
    };
    try {
        const response = await fetch(`http://localhost:5000/api/cats/${catId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(updatedCat),
        });
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

const handleDelete = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/cats/${catId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (response.ok) {
            toast.success('Cat successfully deleted.');
            router.push('/cats');
        } else {
            toast.error('Cat could not be deleted.');
        }
    } catch (error) {
        console.error('Error deleting cat:', error);
        toast.error('An error occurred while deleting the cat.');
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
            <form @submit.prevent="handleUpdate" class="form">
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
                    <button type="submit" class="btn">Save</button>
                </div>
                <button type="button" class="btn-delete" @click="handleDelete">Delete</button>
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

.btn-delete {
    width: 100%;
    background-color: rgb(184, 40, 40);
    color: white;
    border: none;
    padding: 0.8rem;
    font-weight: 500;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    margin-top: 10px;
    font-family: inherit;
}

.btn-delete:hover {
    background-color: red;
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
    background-color: #FFFFFF;
    color: black;

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