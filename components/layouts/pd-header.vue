<template>
    <header>
      <button @click="emit('preview')"><angle-left width="24" height="24" /></button>
        <h1>{{ getMonthName(month) }} {{ year }}</h1>
      <button @click="emit('next')"><angle-right width="24" height="24" /></button>
    </header>
</template>

<script setup lang="ts">
const props = defineProps({
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() }
});

const emit = defineEmits(["preview", "next"]);
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
  justify-content: space-between;
  margin-bottom: 1em;
  min-height: 10vh;
  text-align: center;
}
header h1 {
  margin: 0;
}

@media all and (max-width: 800px) {
  header {
    padding: 0 1em;
  }
}
</style>