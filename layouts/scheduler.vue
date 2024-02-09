<template>
  <main ref="refWindow" class="h-screen max-w-5xl relative overflow-hidden mx-auto">
    <div v-show="show" class="md:hidden absolute inset-0 bg-zinc-800 bg-opacity-85 transition duration-500 ease-in-out z-20" />
    <pd-header :year="year" :month="month" @preview="preview" @next="next" />
    <slot />
    
    <pd-footer class="md:hidden" :is-show="show" @show="show = !show" />
  </main>
</template>

<script setup lang="ts">
const show = ref<boolean>(false)
const route = useRoute();
const refWindow = ref(null);
const { direction } = useSwipe(refWindow, {
  onSwipe() {
    if (direction.value === "left") next();
    else if (direction.value === "right") preview();
    else if (direction.value === "up") show.value = true;
    else if (direction.value === "down") show.value = false;
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
  if (!show.value) {
    navigateTo(`/${_year}/${_month}`);
  }
}

function next() {
  const _year = month.value === 11 ? year.value + 1 : year.value;
  const _month = month.value === 11 ? 0 : month.value + 1;
  if (!show.value) {
    navigateTo(`/${_year}/${_month}`);
  }
}
</script>

<style scoped>
</style>
