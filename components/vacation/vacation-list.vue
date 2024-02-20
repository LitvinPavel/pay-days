<template>
  <ol v-if="data && data.length" class="mt-3 space-y-3">
      <li
        v-for="({ date_from, date_to, id }, index) in data"
        :key="index"
        class="relative flex items-stretch"
      >
        <vacation-item
          :id="id"
          :date-from="date_from"
          :date-to="date_to"
          @update="emit('update', $event, id)"
        />
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
    <vacation-add-item-dialog v-model="showAddModal" @select="emit('add', $event)" />
</template>

<script setup lang="ts">
defineProps({
  data: { type: Array as PropType<Tables<'vacations'>[]>, default: null },
});

const emit = defineEmits(['update', 'remove', 'add']);
const showAddModal = ref<boolean>(false);
</script>

<style scoped></style>
