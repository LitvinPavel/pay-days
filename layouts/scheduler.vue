<template>
    <main ref="refWindow" class="max-w-5xl relative mx-auto w-full pb-20">
    <pd-header :year="year" :month="month" @preview="preview" @next="next" />
    <slot />
    <pd-footer class="flex-0" />
    </main>
</template>

<script setup lang="ts">
const route = useRoute();
const refWindow = ref(null);
const { direction } = useSwipe(refWindow, {
  onSwipe() {
    if (direction.value === "left") next();
    else if (direction.value === "right") preview();
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

function preview() {
  const _year = month.value === 0 ? year.value - 1 : year.value;
  const _month = month.value === 0 ? 11 : month.value - 1;
  navigateTo(`/${_year}/${_month}`);
}

function next() {
  const _year = month.value === 11 ? year.value + 1 : year.value;
  const _month = month.value === 11 ? 0 : month.value + 1;
  if (_year <= new Date().getFullYear()) {
    navigateTo(`/${_year}/${_month}`);
  }
}
</script>

