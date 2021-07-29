<template>
  <v-overlay :value="enabled" />
</template>

<script lang="ts">
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
</style>