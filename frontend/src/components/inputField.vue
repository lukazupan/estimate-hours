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
      <button class="input-button" type="button" @click="handleClick">get info</button>
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
  box-sizing: border-box;

  border: 2px solid #1a1a1a;
  border-radius: 8px;

  font-family: var(--font-bitcount);
  text-align: center;
  color: gray;
  font-weight: 500;

  transition: color 0.1s;
}

.input-button:hover {
  border: 2px solid #2692ff;
  color: white;
}

.input-button:focus {
  outline: none;
  box-shadow: none;
}
</style>
