<template>
    <loader v-if="loading" @loaded="loading = false" />
    <calendar v-else />
</template>

<script setup lang="ts">
    const loading = ref<boolean>(true);
</script>
