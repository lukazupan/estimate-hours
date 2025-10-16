<template>
  <div class="container">
    <input-field @input="handleInput" @get-repos="handleGetRepos" />
    <div class="dropdown" v-if="isVisible">
      <Dropdown :elements="repoNames" @select="handleSelect" />
    </div>
    <div class="card-container">
      <estimate-card :repo="repo" :summary="summary" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Dropdown from './Dropdown.vue'
import inputField from './inputField.vue'
import EstimateCard from './EstimateCard.vue'

const props = defineProps<{
  repoNames: string[]
  repo: any
  summary: any
}>()

const emit = defineEmits<{
  getRepos: [username: string]
  select: [el: string]
  input: []
}>()

const dropdownVisible = ref(false)

const isVisible = computed(() => dropdownVisible.value && props.repoNames.length > 0)

const handleInput = () => {
  dropdownVisible.value = true
  emit('input')
}

const handleGetRepos = (username: string) => {
  emit('getRepos', username)
}

const handleSelect = (el: string) => {
  emit('select', el)
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  gap: 16px;
  width: 100%;

  min-height: 120px;
}

.card-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dropdown {
  position: absolute;
  top: 60px;
  z-index: 10;
}
</style>
