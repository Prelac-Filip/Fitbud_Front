<script lang="ts" setup>
import type { Workout } from '~/types/Workout';
import type { Workouts } from '~/types/Workouts';

definePageMeta({
  middleware: ['authenticated'],
  layout: 'dashboard',
});


const { data: workouts, pending, error } = await useFetch<Workouts>(() => `http://localhost:8081/workouts`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
});

const workoutCards = ref<{ title: string; description: string; to: string }[]>([]);
const createWorkoutCard = (workout: Workout) => {
  return {
    title: workout.name,
    description: "Exercises: " + workout.exercises + "\nNo. of exercises: " + workout.noOfExercises,
    to: `/app/workouts/${workout.id}`,
  };
};
//console.log(workouts.value);
const workoutsList = workouts.value?._embedded?.workoutList ?? [];
//console.log(workoutsList);
workoutsList.forEach(workout => {
  return workoutCards.value.push(createWorkoutCard(workout));
});
</script>

<template>
  <div>
    <p v-if="pending">
      Fetching...
    </p>
    <pre v-else-if="error">{{ error }}</pre>
    <UContainer v-else>
      <UPage>
        <UPageBody>
          <UPageGrid>
            <UPageCard
              v-for="(card, index) in workoutCards"
              :key="index"
              v-bind="card"
              variant="subtle"
              highlight
              :class="index == 0 ? 'animate-fade-right animate-duration-[2500ms] animate-delay-500 animate-ease-in-out' :
                index == 1 ? 'animate-fade-up animate-duration-[2500ms] animate-delay-[750ms] animate-ease-in-out' :
                  index == 2 ? 'animate-fade-left animate-duration-[2500ms] animate-delay-1000 animate-ease-in-out' : ''" 
            />
          </UPageGrid>
        </UPageBody>
      </UPage>
    </UContainer>
  </div>
</template>

<style></style>