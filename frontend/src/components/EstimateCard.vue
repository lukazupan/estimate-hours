<template>
  <div v-if="showCard" class="card">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>
    <div v-else class="summary-content">
      <div class="name">
        {{ repoName }}
      </div>
      <div class="hours">
        {{ numHours }}
      </div>
      <div class="divider" />
      <div class="description">
        {{ description }}
      </div>
      <div class="size">
        {{ size }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  repo: any
  summary: any
}>()

const parsedSummary = ref<any>(null)
const repoName = ref(null)
const numHours = ref('')
const description = ref('')
const size = ref('')

watch(
  () => props.summary,
  (val) => {
    if (!val) {
      parsedSummary.value = null
      return
    }

    parsedSummary.value = JSON.parse(val.summary)

    repoName.value = parsedSummary.value.sections[0].value
    numHours.value = parsedSummary.value.sections[1].value + ' h'
    description.value = parsedSummary.value.sections[2].value
    size.value = parsedSummary.value.sections[3].value
  },
)

const showCard = computed(() => props.repo)
const isLoading = computed(() => props.repo && !props.summary)
</script>

<style scoped>
.card {
  background-color: rgb(24, 22, 22);
  color: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  text-align: justify;
  line-height: 1.6;
  white-space: pre-wrap;
  font-size: 1rem;
}

.summary-content {
  display: grid;

  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr auto 1fr;
}

.card .name {
  align-self: center;

  font-family: var(--font-bitcount);
  font-size: large;
  font-weight: bold;
}

.card .hours {
  grid-column-start: 2;
  align-self: center;

  font-family: var(--font-bitcount);
  font-size: large;
  font-weight: bold;
}

.card .divider {
  grid-column-start: 1;
  grid-column-end: 3;
  margin-bottom: 8px;

  border: 1px solid white;
  border-radius: 8px;
}

.card .description {
  grid-column-start: 1;
  grid-column-end: 3;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #2692ff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
