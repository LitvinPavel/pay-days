<template>
  <!-- <ul class="max-w-sm divide-y divide-gray-700 mx-auto p-4">
    <li class="py-3 sm:py-4">
      <account />
    </li>
    <li class="py-3 sm:py-4">
      <vacation />
    </li>
</ul> -->

<div class="p-5 mb-4 border rounded-lg bg-gray-800 border-gray-700 max-w-lg mx-auto my-5">
    <span class="text-lg font-semibold text-white">Профиль</span>
    <ol class="mt-3 divide-y divide-gray-700">
        <li>
          <account />
        </li>
    </ol>
</div>
<vacation-list class="p-5 mb-4 border rounded-lg bg-gray-800 border-gray-700 max-w-lg mx-auto my-5" />



    <!-- <div>
        <button class="rounded-full shadow-md shadow-black m-4 p-3" @click="signOut">Выйти</button>
    </div> -->
</template>

<script setup lang="ts">
const client = useSupabaseClient();

async function signOut() {
  const { error } = await client.auth.signOut()
  if (!error) {
    navigateTo("/login")
  } else {
    createError({ statusCode: 404, message: `${error}` })
  }
  
}
</script>

<style scoped>

</style>