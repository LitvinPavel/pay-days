<template>
  <p v-if="pending" class="text-center mt-1">Loading...</p>
  <div v-else class="mt-3 space-y-3">
    <slot :data="data" :emits="{ onItemUpdate, onItemRemove, addItem }" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dbName: { type: String, require: true },
});

const { data, pending, refresh } = await useFetch(
  `/api/supabase/${props.dbName}`
);
async function onItemUpdate<T>(items: T[], id: string): Promise<void> {
  const { error } = await useFetch(`/api/supabase/${props.dbName}?id=${id}`, {
    method: "put",
    body: items,
  });
  if (error) console.log(error);
  refresh();
}

async function onItemRemove(id: string | null): Promise<void> {
  const { error } = await useFetch(`/api/supabase/${props.dbName}?id=${id}`, {
    method: "delete",
  });
  if (error) console.log(error);
  refresh();
}

async function addItem<T>(items: T[]): Promise<void> {
  const { error } = await useFetch(`/api/supabase/${props.dbName}`, {
    method: "post",
    body: items,
  });
  if (error.value) console.log(error);
  refresh();
}
</script>

<style scoped></style>
