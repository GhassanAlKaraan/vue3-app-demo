<script setup></script>

<template>
    <div class="container">
        <header>
            <h2>Add a new Cat</h2>
        </header>
        <main>
            <form class="form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div class="form-group">
                    <label for="breed">Breed</label>
                    <input type="text" id="breed" name="breed" />
                </div>
                <div class="form-group">
                    <label for="age">Age</label>
                    <input type="number" id="age" name="age" />
                </div>
                <div class="form-group">
                    <label for="favorite-toy">Favorite Toy</label>
                    <input type="text" id="favorite-toy" name="favorite-toy" />
                </div>
                <div class="buttons">
                    <RouterLink to="/cats" class="btn-secondary">Cancel</RouterLink>
                    <button type="submit" class="btn">Add</button>
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