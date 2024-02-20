<template>
  <div class="calendar">
    <ul class="calendar__wrapper weekdays">
      <li class="calendar__item">
        <abbr title="Пн">Понедельник</abbr>
      </li>
      <li class="calendar__item">
        <abbr title="Вт">Вторник</abbr>
      </li>
      <li class="calendar__item">
        <abbr title="Ср">Среда</abbr>
      </li>
      <li class="calendar__item">
        <abbr title="Чт">Четверг</abbr>
      </li>
      <li class="calendar__item">
        <abbr title="Пт">Пятница</abbr>
      </li>
      <li class="calendar__item holiday">
        <abbr title="Сб">Суббота</abbr>
      </li>
      <li class="calendar__item holiday">
        <abbr title="Вс">Воскресенье</abbr>
      </li>
    </ul>
    <ol class="calendar__wrapper days">
      <template v-for="(item, key) in days">
        <slot :item="item" :date="Number(key)">
          <li
            v-for="(item, key) in days"
            :key="key"
            :style="
              Number(key) === 1
                ? `grid-column: ${item.weekDay === 0 ? 7 : item.weekDay};`
                : ''
            "
            @click="$emit('select', Number(key))"
          >
            <span>{{ key }}</span>
          </li>
        </slot>
      </template>
    </ol>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() },
  vacation: { type: Array as PropType<Tables<'vacations'>[] | undefined>, default: null }
});

const { days, work } = await useGetDaysData(props.year, props.month);

const workFromVacation = computed(() => {
  const d: { date_from: any, date_to: any } = props.vacation;
  console.log(props.vacation)
  if (d && d?.date_from && d?.date_to) {
    return work.filter((item: number) => isWithinDateRange(props.year, props.month, item, [d.date_from, d.date_to]))
  } else return []
  
})
</script>

<style scoped></style>
