<script setup lang="ts">
const columns = [{
  label: 'Resursi',
  children: [{
    label: 'O nama',
    to: '/'
  }, {
    label: 'Za sve koji žele više',
    to: '/'
  }, {
    label: 'Cjenik',
    to: '/'
  }, {
    label: 'Galerija',
    to: '/'
  }]
}, {
  label: 'Kontakt',
  children: [{
    label: 'Filip: +385 99 660 2225',
    icon: 'fluent:call-20-regular',
    to: 'tel:+385996602225'
  }, {
    label: 'prelacfilip@gmail.com',
    icon: 'fluent:mail-20-regular',
    to: 'mailto:prelacfilip@gmail.com'
  }, {
    label: 'My LinkedIn',
    icon: 'simple-icons:linkedin',
    to: 'https://www.linkedin.com/in/prelacfilip/',
    target: '_blank'
  }]
}];

</script>

<template>
  <USeparator color="primary" size="sm" />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #left>
            <div class="flex flex-row">
              <!--<AppLogo class="h-40 shrink-0" />-->
              <div class="self-center text-muted text-sm">FitBud is a project to dive deep into my own skills as a
                programmer and as an athlete. This project serves as a constant development tool for my skillset, and
                hopefully for yours as well.</div>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-muted">
        Built by Filip Prelac • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton to="https://www.linkedin.com/in/prelacfilip/" target="_blank" icon="simple-icons:linkedin"
        aria-label="Filip Prelac LinkedIn" color="neutral" variant="ghost" />
    </template>
  </UFooter>
</template>