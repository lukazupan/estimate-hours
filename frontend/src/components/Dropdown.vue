<template>
  <div ref="dropdownRef" class="dropdown-container">
    <button @click="handleDropdownVisibility" class="dropdown-button">Select repo</button>

    <div class="dropdown-items" v-if="visible">
      <button class="dropdown-item-button" v-for="el in elements" @click="onClick(el)">
        {{ el }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  elements: Array<string>
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

const handleDropdownVisibility = () => visible.value = !visible.value

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

  position: absolute;

  border-radius: 8px;
}

.dropdown-button {
  padding: 10px;

  border: 1px solid #1a1a1a;
  border-radius: 8px;

  text-align: center;
  color: gray;
  font-weight: 500;

  transition: color 0.1s;
}

.dropdown-button:hover,
.dropdown-item-button:hover {
  border: 1px solid rgb(60, 255, 0);
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

  background-color: #1a1a1a;
  border-radius: 8px;
}

.dropdown-item-button {
  background-color: #1a1a1a;
  color: gray;
  height: fit-content;

  font-weight: 400;
}
</style>
