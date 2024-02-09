<template>
  <component :is="tag" class="relative inline-block tooltip">
      <slot name="action" />
      <div
        class="flex flex-col p-4 bg-cyan-900 border border-white z-20 absolute opacity-0 left-0 bottom-full mb-1 transform transition duration-500 ease-in-out invisible tooltip-wrap"
      >
        <slot name="content" />
      </div>
    </component>
</template>

<script setup lang="ts">
defineProps({
  tag: { type: String, default: 'div' },
});
</script>

<style scoped>
.tooltip:hover .tooltip-wrap {
  visibility: visible;
  opacity: 1;
}
</style>
