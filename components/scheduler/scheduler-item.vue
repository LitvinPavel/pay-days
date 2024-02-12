<template>
  <li
    tag="li"
    :style="
      date === 1 ? `grid-column: ${item.weekDay === 0 ? 7 : item.weekDay};` : ''
    "
    class=""
    :class="[
      { holiday: item.isHoliday },
      (date === firstPayDay  && last) || (date === lastPayDay && first)  ? 'bg-cyan-900' : 'bg-zinc-800',

    ]"
    @click="$emit('select')"
  >
    <span
      class="absolute right-0 top-0 mt-1 mr-1 md:mt-2 md:mr-2 text-xs md:text-xl"
      >{{ date }}</span
    >
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  item: { type: Object as PropType<IDayState | null>, default: null },
  date: { type: Number, default: null },
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() },
});

const { first, last, lastYear, work } = await useGetDaysData(props.year, props.month);


const firstPayDay = computed(() => {
    return nearestDate(work, 12)
})

const lastPayDay = computed(() => {
    return nearestDate(work, 27)
})

const salary = 200000;
</script>

<style scoped></style>
