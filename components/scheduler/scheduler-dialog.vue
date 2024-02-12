<template>
    <modal v-if="modelValue" :title="title" @close="emit('update:modelValue', false)">
      <template #body>
        <div v-if="date === prepayDay || date === payDay" class="p-4 md:p-5">
          <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            <span v-if="date === prepayDay">Аванс</span>
            <span v-else>Зарплата</span>
          </h5>
<div class="flex items-baseline text-gray-900 dark:text-white">
<span v-if="date === prepayDay" class="text-5xl font-extrabold tracking-tight">{{ sumFormat(salary * first) }}</span>
<span v-else class="text-5xl font-extrabold tracking-tight">{{ sumFormat(salary * last) }}</span>
<span class="text-3xl font-semibold ml-2">₽</span>
</div>
        </div>
      </template>
    </modal>
    
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  date: { type: Number || undefined, default: undefined },
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() }
});

const emit = defineEmits(['update:modelValue']);
const salary = 200000;

const { first, last, lastYear, work } = await useGetDaysData(props.year, props.month);

const title = computed(() => {
    return new Date(props.year, props.month, props.date).toLocaleDateString()
})

const prepayDay = computed(() => {
  return nearestDate(work, 27)
})

const payDay = computed(() => {
    return nearestDate(work, 12)
})
</script>

<style scoped>

</style>