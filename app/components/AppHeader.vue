<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { loggedIn, clear: clearSession } = useUserSession()
const isLoggedIn = loggedIn.value;

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

const logout = async () => {
  await clearSession();
  await navigateTo('/login');
}
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
      <UButton v-if="isLoggedIn" trailing-icon="fluent:arrow-exit-20-filled" size="md" variant="soft" color="primary" @click="logout()">Logout</UButton>
      <UButton v-else trailing-icon="fluent:person-20-filled" size="md" variant="soft" color="primary" to="/login">Login</UButton>
      <!--<UButton icon="simple-icons:linkedin" size="md" variant="link" color="neutral" to="https://www.linkedin.com/in/prelacfilip/" target="_blank"/>-->

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
