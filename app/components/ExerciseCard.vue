<script lang="ts" setup>
import type { Exercise } from '~/types/Exercise';
import type { Exercises } from '~/types/Exercises';

const props = defineProps<{
  exercises?: Exercise[],
  isWorkoutCreation?: {
    type: boolean,
    default: false
  },
}>();

const addToFavorites = (exercise: Exercise) => {
  useToast().add({ title: 'Added to Favorites', description: `${exercise.name} has been added to your favorites! TODO HAVE TO IMPLEMENT ON THE BACKEND`, color: 'success' });
  //console.log(`Added ${exercise.name} to favorites!`);
};

const select = (exercise: Exercise) => {
  return exercise;
};
</script>

<template>
  <UPageCard v-for="(exercise, index) in exercises" :key="index" description="Description" orientation="vertical"
    reverse highlight :ui="{
      footer: 'w-full',
      body: 'w-full',
    }">
    <template #header>
      <img src="" alt="Custom Exercise Image" class="w-full" />
    </template>
    <template #leading>
      Leading
    </template>
    <template #title>
      <div class="mb-3">
        {{ exercise.name }}
      </div>
    </template>
    <template #description>
      <div :class="!isWorkoutCreation ? 'flex flex-col gap-3' : 'flex flex-row gap-3 justify-around'">
        <UCollapsible class="flex flex-col gap-2 w-48">
          <UButton class="group" label="Body Parts" color="neutral" variant="subtle"
            trailing-icon="i-lucide-chevron-down" :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }" block />

          <template #content>
            {{ exercise.bodyParts }}
          </template>
        </UCollapsible>

        <UCollapsible class="flex flex-col gap-2 w-48">
          <UButton class="group" label="Specific Body Parts" color="neutral" variant="subtle"
            trailing-icon="i-lucide-chevron-down" :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }" block />

          <template #content>
            {{ exercise.specificBodyParts }}
          </template>
        </UCollapsible>
      </div>
      <div v-if="isWorkoutCreation" class="mt-2 ">
        <UFormField label="Sets" required>
          <UInputNumber v-model="exercise.repetitions" :min="0" :max="100" class="w-full"/>
        </UFormField>
        <UFormField label="Repetitions" required>
          <UInputNumber v-model="exercise.sets" :min="0" :max="1000" class="w-full"/>
        </UFormField>
      </div>
    </template>
    <template #footer>
      <div v-if="isWorkoutCreation" class="flex justify-end gap-2 mt-1">
        <UButton icon="fluent:checkmark-20-filled" label="Select" color="primary" variant="subtle" @click="select(exercise)"/>
      </div>
      <div v-else class="flex justify-end gap-2 mt-1">
        <UModal :title="exercise.name + ' details'"
          :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full',
            size: 'sm',
          }">
          <UButton label="Details" color="primary" variant="subtle" class="" />

          <template #body>
            Enter more details about the exercise here.
          </template>
        </UModal>
        <UButton icon="fluent:star-24-regular" color="primary" variant="subtle" @click="addToFavorites(exercise)"/>
      </div>
    </template>
  </UPageCard>
</template>

<style></style>