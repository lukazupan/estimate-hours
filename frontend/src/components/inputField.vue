<template>
    <div class="container">
        <div>
            <h1>Estimate time</h1>
            <div class="">
                <p>Want to know how much time you spent coding your project ?</p>
            </div>
        </div>
        <div>
            <input class="inputField" v-model="username" placeholder="Enter username" />
            <input class="inputField" v-model="repoName" placeholder="Enter repo name" />
        </div>
        <button class="button" @click="handleClick">Get info</button>
        <div v-if="estimation">
            <p>{{ estimation.message }}</p>
            <p>Estimated time: {{ estimation.time }} hours</p>
        </div>

        <div>
            <p>{{ summary }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getSpecificEstimation, getSummary } from '../api'

const username = ref('')
const repoName = ref('')
const estimation = ref(null)
const summary = ref('')

async function handleClick() {
    if (!username.value) {
        console.log("Username can't be empty.")
        return
    }
    
    if (!repoName.value) {
        console.log("Repo name can't be empty.")
        return
    }
    
    try {
        estimation.value = await getSpecificEstimation(username.value, repoName.value)
        
        if (estimation.value) {
            summary.value = await getSummary(estimation.value.data, estimation.value.time)
        }
    } catch (error) {
        console.error('Error getting estimation or summary:', error)
        estimation.value = null
        summary.value = ''
    }
}
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.inputField {
    width: 200px;
    height: 30px;
    margin: 10px;
}

.button {
    width: 200px;
    margin: 10px;
}
</style>
