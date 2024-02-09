<template>
  <div>
    <button class="rounded-full shadow-md shadow-black absolute bottom-0 right-0 mb-6 mr-6 p-3" @click="signOut"><sign-out-alt width="24" height="24" /></button>
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
      <scheduler-item
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
  month: { type: Number, default: new Date().getMonth() },
});
const client = useSupabaseClient();
const { days } = await useGetDaysData(props.year, props.month);
async function signOut() {
  const { error } = await client.auth.signOut()
  if (!error) {
    navigateTo("/login")
  } else {
    createError({ statusCode: 404, message: `${error}` })
  }
  
}
</script>

<style scoped>
ul,
ol {
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

ol.day-grid li {
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
  ul,
  ol {
    grid-gap: 0.25em;
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
