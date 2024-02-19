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
});
const emit = defineEmits(["update"]);
const date = computed({
  get() {
    return [props.dateFrom, props.dateTo];
  },
  set(value: string[]) {
    emit("update", value);
  },
});
</script>

<style scoped></style>
