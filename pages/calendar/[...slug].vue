<template>
  <load-data
    v-if="loading"
    @loaded="loading = false"
    :year="year"
    :month="month"
  />
  <div v-else>
    <scheduler
      :year="year"
      :month="month"
      :vacation="data"
      class="calendar__full"
      v-slot="{ item, date }"
    >
      <scheduler-item
        :date="date"
        :item="item"
        :year="year"
        :month="month"
        @select="onItemSelect(date)"
      />
    </scheduler>
    <scheduler-dialog
      v-model="showModal"
      :date="selectDay"
      :year="year"
      :month="month"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "scheduler",
});

const route = useRoute();
const loading = ref<boolean>(true);
const showModal = ref<boolean>(false);
const selectDay = ref<number | null>(null);

const year = computed(() => {
  const [y] = route.params.slug || [new Date().getFullYear()];
  return Number(y) || new Date().getFullYear();
});

const month = computed(() => {
  const [_, m] = route.params.slug || [null, new Date().getMonth()];
  return typeof Number(m) === "number" && isFinite(Number(m))
    ? Number(m)
    : new Date().getMonth();
});

const { data, pending, refresh } = await useFetch(
  `api/supabase/filter/vacation-by-month?year=${year.value}&month=${month.value}`
);

function onItemSelect(key: number) {
  selectDay.value = Number(key) || null;
  showModal.value = true;
}
</script>
