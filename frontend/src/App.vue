<template>
  <DisplayData @get-repos="handleGetRepos" :repo-names="publicRepoNames" />
</template>

<script lang="ts" setup>
import DisplayData from './components/DisplayData.vue'
import { getRepos } from './api'
import { ref } from 'vue'

let publicRepos: any[] = []
const publicRepoNames = ref<string[]>([])

const handleGetRepos = async (username: string) => {
  const response = await getRepos(username)

  publicRepos = response.publicRepos

  console.log(publicRepos)

  publicRepoNames.value = []

  publicRepos.forEach((repo: { name: string }) => {
    publicRepoNames.value.push(repo.name)
  })
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
</style>
