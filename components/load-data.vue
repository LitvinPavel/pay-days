<template>
    <div style="display: flex; align-items: center;">
      <loader />
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    year: { type: Number, default: new Date().getFullYear() },
    month: { type: Number, default: new Date().getMonth() },
    userId: { type: String || undefined, default: null }
  });
  
  const emit = defineEmits(["loaded"]);
  
  onMounted(async () => {
    const state = await useGetStorage(`${props.year}-${props.month}`);
    if (!state) {
      await setStage();
    } else emit("loaded", true);
  });
  
  async function setStage() {
    try {
      const { data } = await useFetch(`/api/calendar?year=${props.year}`, {
        key: `notes for ${props.userId}`,
        headers: useRequestHeaders(['cookie'])
      });
      if (data.value) {
        (data.value || []).forEach((item: IResultItem, key: number) => {
          useSetStorage(`${props.year}-${key}`, item);
        });
      }
  
      emit("loaded", true);
    } catch (error) {
      console.error(error);
    }
  }
  </script>
  
  <style scoped>
  </style>
  