<template>
  <li
    tag="li"
    :style="
      date === 1 ? `grid-column: ${item.weekDay === 0 ? 7 : item.weekDay};` : ''
    "
    class="calendar__item"
    :class="[
      { holiday: item.isHoliday },
      getStatus(date),

    ]"
    @click="$emit('select')"
  >
    <span
      class="calendar__item__day"
      >{{ date }}</span
    >
  </li>
</template>

<script setup lang="ts">
const itemColors: ICaledarIemStatus = {
  accent: 'bg-purple-500',
  primary: 'bg-teal-500',
  secondary: 'bg-indigo-500'
}
const props = defineProps({
  item: { type: Object as PropType<IDayState | null>, default: null },
  date: { type: Number, default: null },
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() }
});

const { first, last, lastYear, work } = await useGetDaysData(props.year, props.month);
const vacationRange = ['2024-02-14', '2024-02-17']

const firstPayDay = computed(() => {
    return nearestDate(work, 12)
})

const lastPayDay = computed(() => {
    return nearestDate(work, 27)
})

const vacation = computed(() => {
  return work.filter((item: number) => isWithinDateRange(props.year, props.month, item, ['2024-02-14', '2024-02-17']))
})

function getStatus(date: number): string {
  if (isWithinDateRange(props.year, props.month, date, vacationRange)) {
    return itemColors.accent;
  } else if ((date === firstPayDay.value  && last) || (date === lastPayDay.value && first)) {
    return itemColors.primary;
  } else return 'bg-zinc-800'
} 

const salary = 200000;
</script>

<style scoped></style>
