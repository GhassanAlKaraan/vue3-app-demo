<script setup>
import CatCard from "@/components/CatCard.vue";
import { ref } from "vue";
import { RouterLink } from 'vue-router';

// Function moved inside <script setup> so it's directly accessible in the template
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const cats = ref([
    { name: "Shadow", breed: "British Shorthair", age: 4, favoriteToy: "Catnip Mouse" },
    { name: "Whiskers", breed: "Siamese", age: 3, favoriteToy: "Laser Pointer" },
    { name: "Mittens", breed: "Persian", age: 5, favoriteToy: "Yarn Ball" },
    { name: "Luna", breed: "Maine Coon", age: 2, favoriteToy: "Feather Wand" },
    { name: "Oliver", breed: "Scottish Fold", age: 6, favoriteToy: "Crinkle Ball" },
    { name: "Bella", breed: "Ragdoll", age: 4, favoriteToy: "Scratching Post" },
    { name: "Max", breed: "Sphynx", age: 3, favoriteToy: "Plush Mouse" },
    { name: "Lucy", breed: "Bengal", age: 5, favoriteToy: "Interactive Puzzle" },
    { name: "Milo", breed: "Russian Blue", age: 2, favoriteToy: "Ribbon Toy" },
    { name: "Nala", breed: "Abyssinian", age: 4, favoriteToy: "Cat Tunnel" }
]);
</script>

<template>
    <div class="card-container">
        <RouterLink v-for="(cat, index) in cats" :key="index"
            :to="{ name: 'edit-cat', params: { id: index }, state: { cat } }">
            <CatCard :catModel="cat" :bgcolor="getRandomColor()"></CatCard>
        </RouterLink>
    </div>
</template>

<style scoped>
.card-container {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
</style>
