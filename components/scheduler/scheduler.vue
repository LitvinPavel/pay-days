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
});

const { days } = await useGetDaysData(props.year, props.month);
</script>

<style scoped></style>
