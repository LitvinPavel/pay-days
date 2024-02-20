<template>
  <modal
    v-if="modelValue"
    title="Повышение зарплаты"
    @close="emit('update:modelValue', false)"
  >
    <template #body>
      <form class="mx-auto pb-4 px-4 space-y-2">
        <label for="month" class="block mb-2 text-sm font-medium text-white"
          >Месяц</label
        >
        <client-only>
          <vue-date-picker
            v-model="monthData"
            id="month"
            model-type="yyyy-MM-dd"
            format="MM.yyyy"
            month-picker
            :enable-time-picker="false"
          />
        </client-only>
        <label for="salary" class="block mb-2 text-sm font-medium text-white"
          >Зарплата</label
        >
        <input
            v-model="salary"
          type="number"
          id="salary"
          class="text-sm border-0 rounded-md block w-full p-2 bg-white placeholder-black text-black"
          placeholder="100 000"
        />
      </form>
    </template>
    <template #footer>
      <btn class="ml-auto" @onClick="onAdd">Добавить</btn>
    </template>
  </modal>
</template>

<script setup lang="ts">
defineProps({
  modelValue: { type: Boolean, default: false },
});
const emit = defineEmits(["select", "update:modelValue"]);

const monthData = ref<string>(null);
const salary = ref<number>(null);
function onAdd() {
  if (salary.value && monthData.value) {
    emit("select", { date: monthData.value, value: salary.value });
    emit("update:modelValue", false);
  }
}
</script>

<style scoped></style>
