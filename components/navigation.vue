<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-gray-700 border-gray-600"
  >
    <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
      <nuxt-link
        v-for="{ title, icon, link } in items"
        :key="link"
        :to="link"
        tag="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 group cursor-pointer"
      >
        <component
          :is="`${icon}-icon`"
          class="w-6 h-6 mb-2 text-gray-400 group-hover:text-blue-500"
        />
        <span
          class="text-sm text-gray-400 group-hover:text-blue-500"
          >{{ title }}</span
        >
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { title: "Главная", icon: "home", link: "/" },
  { title: "Календарь", icon: "calendar", link: "/calendar" },
  { title: "Настройки", icon: "settings", link: "/settings" }
]
</script>

<style scoped>
</style>