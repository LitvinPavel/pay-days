<template>
  <modal
    v-if="modelValue"
    title="Добавить отпуск"
    @close="emit('update:modelValue', false)"
  >
    <template #body>
      <div class="">
        <client-only>
          <vue-date-picker
            v-model="dateRange"
            range
            model-type="yyyy-MM-dd"
            format="dd.MM.yyyy"
            inline
            no-today
            auto-apply
            dark
            :enable-time-picker="false"
          />
        </client-only>
      </div>
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

const dateRange = ref<string[]>([]);
function onAdd() {
  if (dateRange.value.length) {
    const [date_from, date_to] = dateRange.value
    emit("select", { date_from, date_to });
    emit("update:modelValue", false);
  }
}
</script>

<style scoped></style>
