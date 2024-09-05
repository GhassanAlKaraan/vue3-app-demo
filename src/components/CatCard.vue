<script setup>
defineProps({
    bgcolor: {
        type: String,
        default: '#fff'
    },

    catModel: {
        type: Object,
        default: () => ({
            name: "Shadow",
            breed: "British Shorthair",
            age: 4,
            favoriteToy: "Catnip Mouse"
        })
    }
});
</script>

<template>
    <div class="card">
        <h2>{{ catModel.name }}</h2>
        <p><strong>Breed:</strong> {{ catModel.breed }}</p>
        <p><strong>Age:</strong> {{ catModel.age }}</p>
        <p><strong>Favorite Toy:</strong> {{ catModel.favoriteToy }}</p>
        <!-- <slot></slot> -->
    </div>
</template>

<style scoped>
strong {
    font-weight: 600;
}

.card {
    background-color: v-bind(bgcolor);
    color: black;
    font-size: 18px;
    font-weight: 600;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

}

.card:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
}
</style>