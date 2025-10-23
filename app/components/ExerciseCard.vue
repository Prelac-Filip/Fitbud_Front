<script lang="ts" setup>
import type { Exercise } from '~/types/Exercise';

const props = defineProps<{
  exercises?: Exercise[]
}>()
</script>

<template>
  <div>
    <UPageCard v-for="(exercise, index) in exercises" description="Description" class="w-60" orientation="vertical" reverse>
      <template #header>
        <img src="" alt="Custom Exercise Image" class="w-full" />
      </template>
      <template #leading>
        Leading
      </template>
      <template #title>
        Title
      </template>
      <template #description>
        <UCollapsible class="flex flex-col gap-2 w-48">
          <UButton
            class="group"
            label="Body Parts"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }"
            block
          />
    
          <template #content>
            {{exercise.bodyParts}}
          </template>
        </UCollapsible>

        <UCollapsible class="flex flex-col gap-2 w-48">
          <UButton
            class="group"
            label="Specific Body Parts"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }"
            block
          />
    
          <template #content>
            {{exercise.specificBodyParts}}
          </template>
        </UCollapsible>
          
      </template>
      <template #footer>
          Footer
      </template>
    </UPageCard>
  </div>
</template>

<style>

</style>