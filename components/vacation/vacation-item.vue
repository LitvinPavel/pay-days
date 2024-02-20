<template>
  <client-only>
    <vue-date-picker
      v-model="date"
      range
      model-type="yyyy-MM-dd"
      format="dd.MM.yyyy"
      :clearable="false"
      no-today
      :action-row="{ showPreview: false }"
      :enable-time-picker="false"
    />
  </client-only>
</template>

<script setup lang="ts">
const props = defineProps({
  dateFrom: { type: String || Date, default: null },
  dateTo: { type: String || Date, default: null },
  id: { type: String, default: null }
});
const emit = defineEmits(["update"]);
const date = computed({
  get() {
    return [props.dateFrom, props.dateTo];
  },
  set([date_from, date_to]: string[]) {
    emit("update", { date_from, date_to });
  },
});
</script>

<style scoped></style>
