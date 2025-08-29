<template>
  <div class="container">
    <div class="input-row">
      <input
        class="inputField"
        v-model="username"
        placeholder="Enter username"
        type="text"
        autofocus
      />
      <button type="button" @click="handleClick" class="input-button">get info</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits<{
  getRepos: [username: string]
	input: []
}>()

const username = ref('')

const handleClick = () => {
  const trimmedUsername = username.value.trim()

  if (trimmedUsername) {
    emit('getRepos', trimmedUsername)
  }

  emit('input')
}
</script>

<style scoped>
.container {
  width: 100%;
}

.input-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.inputField {
  background-color: #1a1a1a;
  border: 1px solid #1a1a1a;
  border-radius: 8px;

  height: 20px;
  padding: 10px;
}

.inputField:focus {
  outline: none;
  box-shadow: none;
}

.input-button {
  padding: 10px;

  border: 1px solid #1a1a1a;
  border-radius: 8px;

  text-align: center;
  color: gray;
  font-weight: 500;

  transition: color 0.1s;
}

.input-button:hover {
  border: 1px solid rgb(60, 255, 0);
  color: white;
}

.input-button:focus {
  outline: none;
  box-shadow: none;
}
</style>
