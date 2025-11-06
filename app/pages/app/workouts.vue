<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Workouts } from '~/types/Workouts';
import type { Workout } from '~/types/Workout';
import { createWorkout } from '~/types/Workout';
import type { Exercise } from '~/types/Exercise';
import type { Exercises } from '~/types/Exercises';
import type { LoggedUser } from '~/types/LoggedUser';

definePageMeta({
  middleware: ['authenticated'],
  layout: 'dashboard',
});

const {user} = useUserSession()

const loggedInUser = user.value as LoggedUser | null;

const { data: workouts, pending, error } = await useFetch<Workouts>(() => `http://localhost:8081/myWorkouts/${loggedInUser?.id}`, {
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

const actions = [[
  {
    label: 'New Workout',
    icon: 'fluent:dumbbell-20-regular',
    onSelect() { newWorkoutModal() },
  }
]] satisfies DropdownMenuItem[][];

const openWorkoutModal = ref(false);
const newWorkoutModal = () => {
  openWorkoutModal.value = !openWorkoutModal.value;
};

const workoutName = ref('');
const workoutEta = ref('');
const selectedExercises = ref<Exercise[]>([]);

const createWorkoutFromData = async () => {
  //TODO implement workout creation form and logic
  try {
    let newWorkout: Workout = createWorkout({
      id: Math.floor(Math.random() * 10000),
      name: workoutName.value,
      etaWorkoutTime: workoutEta.value,
      exercises: selectedExercises.value,
    });
    console.log("Creating workout: ", newWorkout);
    //TODO POST request to backend to create new workout
    const { data: createdWorkout, pending, error } = await useFetch<Workout>(() => `http://localhost:8081/workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        id: newWorkout.id,
        name: newWorkout.name,
        exercises: newWorkout.exercises,
        noOfExercises: newWorkout.noOfExercises,
        etaWorkoutTime: newWorkout.etaWorkoutTime,
        isPremium: newWorkout.premium,
        isPrivate: newWorkout.private,
      })
    });
    if (error.value) {
      useToast().add({ title: 'Error', description: error.value.message, color: 'error' });
      return;
    } else {
      useToast().add({ title: 'Success', description: `Workout ${createdWorkout.value?.name} created successfully!`, color: 'success' });
      //Reset form data
      workoutName.value = '';
      workoutEta.value = '';
      selectedExercises.value = [];
      openWorkoutModal.value = false;
      //Refresh the page to show the new workout
      newWorkoutModal();
    }
  } catch (error: Error | any) {
    useToast().add({ title: 'Error', description: error.message, color: 'error' });
    return;
  }
};

const configureWorkoutExercises = (exercise: Exercise) => {
  if (selectedExercises.value.includes(exercise)) {
    selectedExercises.value = selectedExercises.value.filter(e => e.id !== exercise.id);
    console.log("Deselected exercise: ", exercise);
    return;
  };
  selectedExercises.value.push(exercise);
  console.log("Selected Exercises: ", selectedExercises.value);
};

const exercisesList = ref<Exercise[]>([]);
const { data: exercises } = await useFetch<Exercises>(() => `http://localhost:8081/exercises`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
});
if (error.value) {
  useToast().add({ title: 'Error', description: error.value.message, color: 'error' });
  exercisesList.value = [];
} else {
  exercisesList.value = exercises.value?._embedded?.exerciseList ?? [];
};

</script>

<template>
  <div class="flex flex-1">
    <UDashboardPanel id="workouts">
      <template #header>
        <UDashboardNavbar title="Workouts" :ui="{ right: 'gap-3' }">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
            <UDropdownMenu :items="actions">
              <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
            </UDropdownMenu>
          </template>
        </UDashboardNavbar>
      </template>
      
      <template #body>
        <p v-if="pending">
          Fetching...
        </p>
        <pre v-else-if="error">{{ error }}</pre>
        <UContainer v-else>
          <UPage>
            <UModal v-model:open="openWorkoutModal" 
              :ui="{footer: 'flex justify-between'}"
              :close="{
                color: 'primary',
                variant: 'outline',
                class: 'rounded-full',
                size: 'sm',
              }">
              <template #title>
                Create New Workout
              </template>
              <template #body>
                <!-- Form fields for creating a new workout go here -->
                <div class="flex flex-col gap-3.5">
                  <UFormField label="Workout Name" required>
                    <UInput v-model="workoutName" placeholder="Enter the workout name." class="w-full"/>
                  </UFormField>
                  <UFormField label="Estimated Workout Time" help="A goal for which you want to complete the workout.">
                    <UInput v-model="workoutEta" placeholder="1h 15m" class="w-full"/>
                  </UFormField>
                  <UFormField label="Exercises">
                    <UModal fullscreen title="Choose Exercises" description="Make sure to enter sets and repetitions!"
                      :close="{
                        color: 'primary',
                        variant: 'outline',
                        class: 'rounded-full',
                        size: 'sm',
                      }">
                      <UButton label="Choose Exercises" color="primary" variant="outline" class="w-full justify-center"/>
                      
                      <template #body>
                        <UPageGrid>
                          <ExerciseCard :exercises="exercisesList" :isWorkoutCreation="{ type: true, default: false }" @exerciseSelected="configureWorkoutExercises"/>
                        </UPageGrid>
                      </template>
                      <template #footer="{ close }">
                        <UButton label="Done" color="primary" variant="solid" @click="close"/>
                      </template>
                    </UModal>
                    <div v-if="selectedExercises.length === 0" class="text-sm text-muted-foreground mt-2">
                      No exercises selected.
                    </div>
                    <div v-else class="flex flex-col gap-2 mt-2">
                      Selected Exercises:
                      <div v-for="(exercise, index) in selectedExercises" :key="index" class="flex items-center justify-between p-2 border border-default rounded">
                        <div>
                          {{ exercise.name }}
                        </div>
                        <div>
                          Sets: {{ exercise.sets }}
                        </div>
                        <div>
                          Reps: {{ exercise.repetitions }}
                        </div>
                      </div>
                    </div>
                  </UFormField>
                </div>
              </template>
              <template #footer>
                <UButton label="Create" color="primary" variant="solid" @click="createWorkoutFromData" />
                <UButton label="Cancel" color="neutral" variant="outline" @click="newWorkoutModal" />
              </template>
            </UModal>
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
              <UPageGrid>
                <!--<WorkoutCard :workouts="workoutsList" />-->
              </UPageGrid>
            </UPageBody>
          </UPage>
        </UContainer>
      </template>
    </UDashboardPanel>
  </div>
</template>

<style></style>