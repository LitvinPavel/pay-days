<template>
  <load-data
    v-if="loading"
    @loaded="loading = false"
    :year="year"
    :month="month"
  />
  <scheduler v-else :year="year" :month="month" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "scheduler",
});

const route = useRoute();
const loading = ref<boolean>(true);

const year = computed(() => {
  const [y] = route.params.slug || [new Date().getFullYear()];
  return Number(y) || new Date().getFullYear();
});

const month = computed(() => {
  const [_, m] = route.params.slug || [null, new Date().getMonth()];
  return typeof Number(m) === "number" && isFinite(Number(m))
    ? Number(m)
    : new Date().getMonth();
});
</script>
