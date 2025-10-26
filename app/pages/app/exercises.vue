<script lang="ts" setup>
import type { Exercise } from '~/types/Exercise';
import type { Exercises } from '~/types/Exercises';

definePageMeta({
  middleware: ['authenticated'],
  layout: 'dashboard',
});
//TODO refactor to use composable for fetching exercises (all API calls)
const { data: exercises, pending, error } = await useFetch<Exercises>(() => `http://localhost:8081/exercises`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
});

const exerciseCards = ref<{ title: string; description: string; to: string }[]>([]);
const createExerciseCard = (exercise: Exercise) => {
  return {
    title: exercise.name,
    description: "Body parts: " + exercise.bodyParts + "\nSpecific body parts: " + exercise.specificBodyParts,
    to: `/exercises/${exercise.id}`,
  };
};
//console.log(exercises.value);
const exercisesList = exercises.value?._embedded?.exerciseList ?? [];
//console.log(exercisesList);
exercisesList.forEach(exercise => {
  return exerciseCards.value.push(createExerciseCard(exercise));
});
</script>

<template>
  <div class="flex flex-1">
    <UDashboardPanel id="exercises">
      <template #header>
        <UDashboardNavbar title="Exercises" :ui="{ right: 'gap-3' }">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <!--<template #right>
            <UDropdownMenu>
              <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
            </UDropdownMenu>
          </template>-->
        </UDashboardNavbar>
      </template>

      <template #body>
        <p v-if="pending">
          Fetching...
        </p>
        <pre v-else-if="error">{{ error }}</pre>
        <UContainer v-else>
          <UPage>
            <UPageBody>
              <!--<UPageGrid>
                <UPageCard
                  v-for="(card, index) in exerciseCards"
                  :key="index"
                  v-bind="card"
                  variant="subtle"
                  highlight
                  :class="index == 0 ? 'animate-fade-right animate-duration-[2500ms] animate-delay-500 animate-ease-in-out' :
                    index == 1 ? 'animate-fade-up animate-duration-[2500ms] animate-delay-[750ms] animate-ease-in-out' :
                      index == 2 ? 'animate-fade-left animate-duration-[2500ms] animate-delay-1000 animate-ease-in-out' : ''" 
                />
              </UPageGrid>-->
              <UPageGrid>
                <ExerciseCard :exercises="exercisesList" />
              </UPageGrid>
            </UPageBody>
          </UPage>
        </UContainer>
      </template>
    </UDashboardPanel>
  </div>
</template>

<style></style>