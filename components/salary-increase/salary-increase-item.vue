<template>
    <div class="flex space-x-2">
        <client-only>
      <vue-date-picker
        v-model="month"
        range
        model-type="yyyy-MM-dd"
        format="MM.yyyy"
        month-picker
        :enable-time-picker="false"
      />
    </client-only>
    <input
        v-model="salaryRef"
        type="number"
        id="salary"
        class="text-sm border-0 rounded-md block w-full p-2 bg-white placeholder-black text-black"
        placeholder="100 000"
        />
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    date: { type: String || Date, default: null },
    salary: { type: Number, default: null }
  });
  const emit = defineEmits(["update"]);
  const month = ref<string>(props.date);
const salaryRef = ref<number>(props.salary);

watch([ month, salaryRef ], () => {
  if (month.value && salaryRef.value) {
    emit("update", { date: month.value, value: salaryRef.value });
  }
});
  </script>
  
  <style scoped></style>
  