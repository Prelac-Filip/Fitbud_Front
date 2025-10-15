<script setup lang="ts">
const route = useRoute()

const { loggedIn } = useUserSession()
const isLoggedIn = loggedIn.value;



const items = computed(() => [{
  label: 'Docs',
  to: '/docs',
  active: route.path.startsWith('/docs')
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Changelog',
  to: '/changelog'
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
      <TemplateMenu />
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeButton />

      <UButton v-if="isLoggedIn" icon="fluent:dual-screen-header-20-regular" color="primary" variant="soft" to="/app/dashboard">Dashboard</UButton>
      <UButton v-else trailing-icon="fluent:person-20-filled" size="md" variant="soft" color="primary" to="/login">Login</UButton>

    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />

      <USeparator class="my-6" />

      <UButton label="Sign in" color="neutral" variant="subtle" to="/login" block class="mb-3" />
      <UButton label="Sign up" color="neutral" to="/signup" block />
    </template>
  </UHeader>
</template>
