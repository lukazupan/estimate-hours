<template>
  <div class="container">
    <inputField @input="handleInput" @get-repos="handleGetRepos"/>
    <div class="dropdown" v-if="isVisible">
      <Dropdown :elements="repoNames" @select="handleSelect"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Dropdown from './Dropdown.vue'
import inputField from './inputField.vue'

const props = defineProps<{
	repoNames: string[]
}>()

const emit = defineEmits<{
	getRepos: [username: string]
  select: [el: string]
}>()

const dropdownVisible = ref(false)

const isVisible = computed(() => dropdownVisible.value && props.repoNames.length > 0)

const handleInput = () => {
  dropdownVisible.value = true
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

.dropdown {
  position: absolute;
  top: 60px;
  z-index: 10;
}
</style>
