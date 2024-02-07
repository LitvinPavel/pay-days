<template>
    <div ref="refWindow" class="calendar">
      <button class="rounded-full shadow-md shadow-black absolute bottom-0 right-0 mb-6 mr-6 p-3" @click="signOut"><sign-out-alt width="24" height="24" /></button>
        <header>
          <button @click="prev"><angle-left width="24" height="24" /></button>
          
          <h1>{{ getMonthName(month) }} {{ year }}</h1>
          <button @click="next"><angle-right width="24" height="24" /></button>
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
          <calendar-item
            v-for="(item, key) in days"
            :key="key"
            :date="Number(key)"
            :item="item"
            :year="year"
            :month="month"
          />
        </ol>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() }
});
const client = useSupabaseClient();
const refWindow = ref(null)
const { direction } = useSwipe(
    refWindow, {
        onSwipe() {
          if(direction.value === "left") next()
          else if (direction.value === "right") prev()
        },
    }
)

const { days } = await useGetDaysData(props.year, props.month);

function prev() {
  const year = props.month === 0 ? props.year - 1 : props.year;
  const month = props.month === 0 ? 11 : props.month - 1;
  navigateTo(`/calendar/${year}/${month}`);
}

function next() {
  const year = props.month === 11 ? props.year + 1 : props.year;
  const month = props.month === 11 ? 0 : props.month + 1;
  navigateTo(`/calendar/${year}/${month}`);
}

async function signOut() {
  const { error } = await client.auth.signOut()
  createError({ statusCode: 404, message: `${error}` })
}

</script>

<style scoped>
.calendar {
    flex: 1;
    max-width: 64em;
}
header {
    display: flex;
    align-items: center;
    font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
    justify-content: space-between;
    margin-bottom: 1em;
    min-height: 10vh;
    text-align: center;
}
header h1 {
  margin: 0;
}
ul, ol {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1em;
  margin: 0 auto;
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
  font-weight: 500;
  text-decoration: none;
}



@media all and (max-width: 800px) {
  ul, ol {
    grid-gap: .25em;
  }
  
  ul.weekdays li {
    font-size: 0;
  }
  header {
    padding: 0 1em;
  }
  ul.weekdays > li abbr:after {
      content: attr(title);
      font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
    text-align: center;
    }
}
</style>