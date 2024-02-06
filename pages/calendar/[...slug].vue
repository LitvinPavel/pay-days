<template>
    <loader v-if="loading" @loaded="loading = false" :year="year" :month="month" />
    <calendar v-else :year="year" :month="month" />
</template>

<script setup lang="ts">
    const route = useRoute();
    const loading = ref<boolean>(true);

    const year = computed(() => {
        const [year] = route.params.slug
        return Number(year) || new Date().getFullYear();
    });

    const month = computed(() => {
        const [_, month] = route.params.slug
        return Number(month) !== null && Number(month) !== undefined ? Number(month) : new Date().getMonth();
    });
</script>
