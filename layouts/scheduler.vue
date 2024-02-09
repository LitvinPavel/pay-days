<template>
  <main ref="refWindow" class="calendar">
    <pd-header :year="year" :month="month" />
    <slot />
    <pd-footer />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const refWindow = ref(null);
const { direction } = useSwipe(refWindow, {
  onSwipe() {
    if (direction.value === "left") next();
    else if (direction.value === "right") prev();
  },
});

const year = computed(() => {
  const [year] = route.params.slug || [new Date().getFullYear()];
  return Number(year) || new Date().getFullYear();
});

const month = computed(() => {
  const [_, month] = route.params.slug || [null, new Date().getMonth()];
  return typeof Number(month) === 'number' && isFinite(Number(month))
    ? Number(month)
    : new Date().getMonth();
});

function prev() {
  const _year = month.value === 0 ? year.value - 1 : year.value;
  const _month = month.value === 0 ? 11 : month.value - 1;
  navigateTo(`/${_year}/${_month}`);
}

function next() {
  const _year = month.value === 11 ? year.value + 1 : year.value;
  const _month = month.value === 11 ? 0 : month.value + 1;
  navigateTo(`/${_year}/${_month}`);
}
</script>

<style scoped>
.calendar {
  flex: 1;
  max-width: 64em;
}
</style>
