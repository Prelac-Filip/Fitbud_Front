<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { LoggedUser } from '~/types/LoggedUser';

const {user, clear: clearSession } = useUserSession()
const logout = async () => {
  await clearSession();
  await navigateTo('/');
}

const route = useRoute()
const toast = useToast()

const open = ref(false)
const loggedInUser = ref<LoggedUser | null>(null);

const links = [[{
  label: 'Home',
  icon: 'fluent:home-20-filled',
  to: '/app/dashboard',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Workouts',
  icon: 'fluent:dumbbell-20-regular',
  to: '/app/workouts',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Exercises',
  icon: 'fluent:clipboard-number-123-20-regular',
  to: '/app/exercises',
  onSelect: () => {
    open.value = false
  }
}, /*{
  label: 'Settings',
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  type: 'trigger',
  children: [{
    label: 'General',
    to: '/settings',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Members',
    to: '/settings/members',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Notifications',
    to: '/settings/notifications',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Security',
    to: '/settings/security',
    onSelect: () => {
      open.value = false
    }
  }]
}*/], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Accept',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Opt out',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
  
  loggedInUser.value = user.value as LoggedUser | null;
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar id="default" v-model:open="open" collapsible resizable class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }">
      <template #header="{ collapsed }">
        <UTooltip :text="loggedInUser?.name">
          <UAvatar
            src="https://github.com/benjamincanac.png"
            alt="Benjamin Canac"
          />
        </UTooltip>
        <label>{{ loggedInUser?.name }}</label>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu :collapsed="collapsed" :items="links[0]" orientation="vertical" tooltip popover />

        <UNavigationMenu :collapsed="collapsed" :items="links[1]" orientation="vertical" tooltip class="mt-auto" />
      </template>

      <template #footer="{ collapsed }" :class="collapsed ? 'flex justify-center' : ''">
        <UButton trailing-icon="fluent:arrow-exit-20-filled" size="md" variant="soft" color="primary" @click="logout()" :label="collapsed ? '' : 'Logout'"/>
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

  </UDashboardGroup>
</template>