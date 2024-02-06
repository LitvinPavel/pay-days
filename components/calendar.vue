<template>
    <div class="calendar">
        <header>
          <nuxt-link :to="prev()">prev</nuxt-link>
          <h1>{{ month + 1 }} / {{ year }}</h1>
          <nuxt-link :to="next()">next</nuxt-link>
        </header>
        <ul class="weekdays">
            <li>
            <abbr title="Пн">Понедельник</abbr>
            </li>
            <li>
            <abbr title="Вт">Вторник</abbr>
            </li>
            <li>
            <abbr title="Ср">Среда</abbr>
            </li>
            <li>
            <abbr title="Чт">Четверг</abbr>
            </li>
            <li>
            <abbr title="Пт">Пятница</abbr>
            </li>
            <li class="holiday">
            <abbr title="Сб">Суббота</abbr>
            </li>
            <li class="holiday">
            <abbr title="Вс">Воскресенье</abbr>
            </li>
        </ul>
        <ol class="day-grid">
            <li
                v-for="(val, key) in days"
                :key="key"
                :style="Number(key) === 1 ? `grid-column: ${val.weekDay === 0 ? 7 : val.weekDay};` : ''"
                :class="{ 'holiday': val.isHoliday }"
            >
                <span style="position: absolute; right: 0; top: 0; margin: 0.5rem;">{{ key }}</span>
                <span v-if="Number(key) === 12">{{ sumFormat(salary * last) }} ₽</span>
                <span v-if="Number(key) === 27">{{ sumFormat(salary * first) }} ₽</span>
            </li>
        </ol>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() }
});
const salary = 200000;
const last = ref<number>(0);
const { days, work } = await useGetStorage(`${props.year}-${props.month}`);
if (props.month) {
    const { work: prevWork } = await useGetStorage(`${props.year}-${props.month - 1}`);
    last.value = prevWork.filter((w: number) => w > 15).length / prevWork.length
}

const first = computed(() => {
    return work.filter((w: number) => w <= 15).length / work.length;
});

const lastYear = computed(() => {
    return props.month === 11 ? work.length - first.value : 0;
});

function sumFormat(value: number): string {
  if (!value) return '0';
  return String(value.toFixed()).replace(/(.)(?=(\d{3})+$)/g,'$1 ');
}

function prev() {
  const year = props.month === 0 ? props.year - 1 : props.year;
  const month = props.month === 0 ? 11 : props.month - 1;
  return `/calendar/${year}/${month}`
}

function next() {
  const year = props.month === 11 ? props.year + 1 : props.year;
  const month = props.month === 11 ? 0 : props.month + 1;
  return `/calendar/${year}/${month}`
}

</script>

<style scoped>
.calendar {
    flex: 1;
}
header {
    display: flex;
    align-items: center;
    font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
    justify-content: center;
    margin-bottom: 2em;
    background: #000;
    min-height: 10vh;
    text-align: center;
}
ul, ol {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1em;
  margin: 0 auto;
  max-width: 64em;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-left: 0;
  font-size: calc(16px + (21 - 16) * ((100vw - 300px) / (1600 - 300)));
}

ul.weekdays {
  margin-bottom: 1em;
}

ul.weekdays li {
  height: 4vw;
}

ul.weekdays li.holiday {
  color: #00aa87;
}
.weekdays,
.day-grid {
    text-align: right;
}


ol.day-grid li:hover, ol.day-grid li.holiday:hover {
    background-color: #028e4a;
    cursor: pointer;
}

ol.day-grid li {
    background-color: #333;
  border: 1px solid #eaeaea;
  height: 12vw;
  max-height: 125px;
  position: relative;
}

ol.day-grid li.holiday {
    background-color: #00aa87;
}

ul.weekdays abbr[title] {
  border: none;
  font-weight: 800;
  text-decoration: none;
}



@media all and (max-width: 800px) {
  ul, ol {
    grid-gap: .25em;
  }
  
  ul.weekdays li {
    font-size: 0;
  }
  
  ul.weekdays > li abbr:after {
      content: attr(title);
      font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
    text-align: center;
    }
}
</style>