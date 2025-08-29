<template>
  <div class="container">
    <inputField @input="handleInput" @get-repos="handleGetRepos" class="input" />
    <div class="dropdown" v-if="isVisible">
      <Dropdown :elements="repoNames" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Dropdown from './Dropdown.vue'
import inputField from './inputField.vue'

const dropdownVisible = ref(false)
//need to handle something here =>
// selectRepo should be visible when api call is succesful and we get all the repos successfully

const isVisible = computed(() => dropdownVisible.value && props.repoNames.length > 0)

const handleInput = () => {
  dropdownVisible.value = true
}

const handleGetRepos = (username: string) => {
	emit('getRepos', username)
}

const emit = defineEmits<{
	getRepos: [username: string]
}>()

const props = defineProps<{
	repoNames: string[]
}>()
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 16px;
}
</style>
