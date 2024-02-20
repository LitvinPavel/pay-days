<template>
    <ol v-if="data && data.length" class="mt-3 space-y-3">
        <li
          v-for="({ date, value, id }, index) in data"
          :key="index"
          class="relative flex items-stretch"
        >
          <salary-increase-item :date="date" :salary="value" />
          <button class="pl-4 cursor-pointer" @click="emit('remove', id)">
            <trash-bin-icon class="w-6 h-6" />
          </button>
        </li>
        <button class="w-full cursor-pointer" @click="showAddModal = true">
          <plus-icon class="w-6 h-6 mx-auto" />
        </button>
      </ol>
      <p v-else class="text-center mt-1">
        <button class="cursor-pointer" @click="showAddModal = true">
          <plus-icon class="w-6 h-6" />
        </button>
      </p>
      <salary-increase-add-item-dialog v-model="showAddModal" @select="emit('add', $event)" />
  </template>
  
  <script setup lang="ts">
  defineProps({
    data: { type: Object as PropType<Tables<'salary_increase'>>, default: null },
  });
  
  const emit = defineEmits(['update', 'remove', 'add']);
  const showAddModal = ref<boolean>(false);
  </script>
  
  <style scoped></style>
  