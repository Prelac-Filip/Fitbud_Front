<script lang="ts" setup>
  const { data: product, pending, error } = await useFetch(() => `http://localhost:8081/exercises`);
</script>

<template>
  <div>
    <p v-if="pending">
      Fetching...
    </p>
    <pre v-else-if="error">{{ error }}</pre>
    <pre v-else>{{ product }}</pre>
  </div>
</template>

<style>

</style>