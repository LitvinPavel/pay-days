<template>
  <div>
    <div class="flex items-center justify-between">
      <span class="text-lg font-semibold text-white">Отпуск</span>
      <button class="text-2xl leading-0" @click="showAddModal = true">+</button>
    </div>
    <p v-if="pending" class="text-center mt-1">Loading...</p>
    <ol v-else-if="data && data.length" class="mt-3 space-y-3">
      <li v-for="{ date_from, date_to, id } in data" :key="id" class="relative">
        <vacation-item
          :date-from="date_from"
          :date-to="date_to"
          @update="onItemUpdate($event, id)"
        />
        <div
          class="absolute inline-flex items-center justify-center w-6 h-6 p-0.5 text-xs font-bold text-white bg-gray-800 border-2 rounded-full -top-2 -end-2 border-gray-900"
          @click="onItemRemove(id)"
        >
          <trash-bin-icon />
        </div>
      </li>
    </ol>
    <p v-else class="text-center mt-1">Не запланировано</p>
    <vacation-add-item-dialog v-model="showAddModal" @select="addItem" />
  </div>
</template>

<script setup lang="ts">
const showAddModal = ref<boolean>(false);
const { data, pending, refresh } = await useFetch(`/api/supabase/vacations`);
async function onItemUpdate(
  [date_from, date_to]: string[],
  id: string
): Promise<void> {
  const { error } = await useFetch(`/api/supabase/vacations?id=${id}`, {
    method: "put",
    body: { date_from, date_to },
  });
  if (error) console.log(error);
  refresh();
}

async function onItemRemove(id: string): Promise<void> {
  const { error } = await useFetch(`/api/supabase/vacations?id=${id}`, {
    method: "delete",
  });
  if (error) console.log(error);
  refresh();
}

async function addItem([date_from, date_to]: string[]): Promise<void> {
  const { error } = await useFetch(`/api/supabase/vacations`, {
    method: "post",
    body: { date_from, date_to },
  });
  if (error) console.log(error);
  refresh();
}
</script>

<style scoped></style>
