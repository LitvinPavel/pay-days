<template>
  <load-data
    v-if="loading"
    @loaded="loading = false"
    :year="year"
    :month="month"
    :user-id="user?.id"
  />
  <calendar v-else :year="year" :month="month" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const user = useSupabaseUser();
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo("/login");
    }
  });
});
const route = useRoute();
const loading = ref<boolean>(true);

const year = computed(() => {
  const [year] = route.params.slug;
  return Number(year) || new Date().getFullYear();
});

const month = computed(() => {
  const [_, month] = route.params.slug;
  return typeof Number(month) === 'number' && isFinite(Number(month))
    ? Number(month)
    : new Date().getMonth();
});
</script>
