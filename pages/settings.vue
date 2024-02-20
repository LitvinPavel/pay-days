<template>
  <div
    class="p-5 mb-4 border rounded-lg bg-gray-800 border-gray-700 max-w-lg mx-auto my-5"
  >
    <span class="text-lg font-semibold text-white">Профиль</span>
    <ol class="mt-3 divide-y divide-gray-700">
      <li>
        <account />
      </li>
    </ol>
  </div>
  <div
    class="p-5 mb-4 border rounded-lg bg-gray-800 border-gray-700 max-w-lg mx-auto my-5"
  >
    <div>
      <span class="text-lg font-semibold text-white">Отпуск</span>
    </div>
    <setting-list
      v-slot="{ data, emits: { onItemUpdate, onItemRemove, addItem } }"
      db-name="vacations"
    >
      <vacation-list
        :data="data"
        @update="onItemUpdate"
        @remove="onItemRemove"
        @add="addItem"
      />
    </setting-list>
  </div>
  <div
    class="p-5 mb-4 border rounded-lg bg-gray-800 border-gray-700 max-w-lg mx-auto my-5"
  >
    <div>
      <span class="text-lg font-semibold text-white">Зарплата</span>
    </div>
    <setting-list
      v-slot="{ data, emits: { onItemUpdate, onItemRemove, addItem } }"
      db-name="salary_increase"
    >
      <salary-increase-list
        :data="data"
        @update="onItemUpdate"
        @remove="onItemRemove"
        @add="addItem"
      />
    </setting-list>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
async function signOut() {
  const { error } = await client.auth.signOut();
  if (!error) {
    navigateTo("/login");
  } else {
    createError({ statusCode: 404, message: `${error}` });
  }
}
</script>

<style scoped></style>
