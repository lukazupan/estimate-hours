<template>
  <div ref="dropdownRef" class="dropdown-container">
    <button class="dropdown-button font-bitcount" @click="handleDropdownVisibility">Select repo</button>
    <div v-if="visible" class="dropdown-items">
      <button class="dropdown-item-button" v-for="el in elements" @click="onClick(el)">
        {{ el }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  elements: string[]
}>()

const emit = defineEmits<{
  select: [string]
}>()

const visible = ref(false)
const dropdownRef = ref<HTMLElement>()

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleDropdownVisibility = () => (visible.value = !visible.value)

const handleClickOutside = (event: any) => {
  if (!dropdownRef.value) return

  if (!dropdownRef.value.contains(event.target)) {
    visible.value = false
  }
}

const onClick = (el: string) => {
  emit('select', el)

  visible.value = false
}
</script>

<style scoped>
.dropdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 8px;
}

.dropdown-button {
  padding: 10px;
  box-sizing: border-box;

  border: 2px solid #1a1a1a;
  border-radius: 8px;

  font-family: var(--font-bitcount);
  font-size: 16px;
  text-align: center;
  color: gray;

  transition: color 0.1s;
}

.dropdown-button:hover,
.dropdown-item-button:hover {
  border: 2px solid #2692ff;
  color: white;
}

.dropdown-button:focus,
.dropdown-item-button:focus {
  outline: none;
  box-shadow: none;
}

.dropdown-items {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #1a1a1a;
  border-radius: 8px;
}

.dropdown-item-button {
  box-sizing: border-box;

  border: 2px solid #1a1a1a;
  border-radius: 8px;

  background-color: #1a1a1a;
  width: 100%;
  height: fit-content;

  color: gray;
  font-family: var(--font-bitcount);
  font-weight: 400;
}
</style>
