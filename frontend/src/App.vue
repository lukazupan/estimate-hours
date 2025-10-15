<template>
  <div class="app-container">
    <h1 class="font-bitcount-display">Estimate Hours</h1>
    <div class="display-data-container">
      <display-data
        @get-repos="handleGetRepos"
        @select="handleRepoSelected"
        :repo-names="publicRepoNames"
      />
    </div>
    <div class="card-container">
      <estimate-card :repo="selectedRepo" :summary="summary" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DisplayData from './components/DisplayData.vue'
import EstimateCard from './components/EstimateCard.vue'
import { getRepos, getSpecificEstimation, getSummary } from './api'
import { ref } from 'vue'

let publicRepos: any[] = []
const publicRepoNames = ref<string[]>([])
let summary = ref<object>()
const selectedRepo = ref(null)
const selectedRepoName = ref<string>('')
const currentUsername = ref('')

const handleGetRepos = async (username: string) => {
  currentUsername.value = username

  const response = await getRepos(username)

  publicRepos = response.publicRepos

  publicRepoNames.value = []

  publicRepos.forEach((repo: { name: string }) => {
    publicRepoNames.value.push(repo.name)
  })
}

const handleRepoSelected = (el: string) => {
  publicRepos.forEach((repo) => {
    if (repo.name === el) {
      selectedRepo.value = repo
      selectedRepoName.value = repo.name
    }
  })
  generateRepoSummary()
}

const generateRepoSummary = async () => {
  const result = await getSpecificEstimation(currentUsername.value, selectedRepoName.value)
  let time = result.time

  summary.value = await getSummary(selectedRepo.value, time)
}
</script>

<style scoped>
.error {
  color: #ff6b6b;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background-color: #ffe0e0;
}

.selected {
  color: #28a745;
  padding: 10px;
  margin: 10px 0;
  font-weight: bold;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.display-data-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  min-height: 150px;
}

.card-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
