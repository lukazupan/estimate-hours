<template>
	<div class="container">
		<input
			class="inputField"
			v-model="username"
			placeholder="Enter username"
			type="text"
			autofocus
		/>
		<button
			type="button"
			@click="handleClick"
			class="input-button"
		>get info</button>
	</div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits<{
	getRepos: [username: string]
}>()

const username = ref('')

const handleClick = () => {
	const trimmedUsername = username.value.trim()

  	if (trimmedUsername) {
    	emit('getRepos', trimmedUsername)
  	}
}
</script>

<style scoped>
.container {
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
	font-weight:400;

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
