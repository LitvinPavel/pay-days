<template>
  <li
    :style="
      date === 1
        ? `grid-column: ${item.weekDay === 0 ? 7 : item.weekDay};`
        : ''
    "
    :class="{ holiday: item.isHoliday }"
    
  >
    <span class="absolute right-0 top-0 mt-1 mr-1 md:mt-2 md:mr-2 text-xs md:text-xl">{{
      date
    }}</span>
    <span v-if="date === 12" class="absolute md:static bottom-0 mb-2 md:mb-0 text-xs md:text-xl text-red-400 font-semibold">{{ sumFormat(salary * last) }} ₽</span>
    <span v-if="date === 27" class="absolute md:static bottom-0 mb-2 md:mb-0 text-xs md:text-xl text-red-400 font-semibold">{{ sumFormat(salary * first) }} ₽</span>
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  item: { type: Object as PropType<IDayState | null>, default: null },
  date: { type: Number, default: null },
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() }
});

const { first, last, lastYear } = await useGetDaysData(
  props.year,
  props.month
);

const salary = 200000;
</script>

<style scoped></style>
