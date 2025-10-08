<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Exercises",
      icon: "fa6-solid:dumbbell",
      to: "/exercises",
      inactiveClass: "bg-black",
    }
  ]
]);
</script>

<template>
  <UHeader>
    <template #left>
      <div class="flex flex-row justify-center items-center">
        <NuxtLink to="/">
          <AppLogo class="w-auto h-14 shrink-0" />
        </NuxtLink>
      </div>
    </template>

    <template #default>
      <UNavigationMenu :items="items" variant="link" class="hidden lg:block" />
    </template>

    <template #right> 
        <UButton icon="simple-icons:linkedin" size="md" variant="link" color="neutral" to="https://www.linkedin.com/in/prelacfilip/" target="_blank"/>

        <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
