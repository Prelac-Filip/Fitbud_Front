<script lang="ts" setup>
  definePageMeta({
    middleware: ['authenticated'],
  });

  const { data: product, pending, error } = await useFetch(() => `http://localhost:8081/exercises`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
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