<script setup>
import CatCard from "@/components/CatCard.vue";
import { useToast } from "vue-toastification";
import { reactive, onMounted, ref } from "vue";
import { RouterLink } from 'vue-router';
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const cats = ref([]);
const state = reactive({ isLoading: true });

const toast = useToast();

const fetchCats = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/cats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (response.ok) {
            const json = await response.json();
            cats.value = json.cats;
        } else {
            toast.error('Failed to fetch cat details.');
        }
    } catch (error) {
        console.error('Error fetching cat details:', error);
        toast.error('An error occurred while fetching cat details.');
    }
};

onMounted(async () => {
    try {
        await fetchCats();
    } catch (error) {
        console.error(error);
    } finally {
        state.isLoading = false;
    }
});

</script>

<template>
    <div v-if="state.isLoading" class="load-spinner">
        <PulseLoader />
    </div>
    <div v-else class="card-container">
        <RouterLink v-for="cat in cats" :key="cat._id" :to="{ name: 'edit-cat', params: { id: cat._id } }">
            <CatCard :catModel="cat" :bgcolor="getRandomColor()"></CatCard>
        </RouterLink>
    </div>
</template>

<style scoped>
.load-spinner {
    text-align: center;
}

.card-container {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}

@media (max-width: 768px) {
    .card-container {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 480px) {
    .card-container {
        grid-template-columns: 1fr;
    }
}
</style>
