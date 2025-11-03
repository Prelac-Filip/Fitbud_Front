import type { Exercise } from "./Exercise";
import type { Links } from "./Links";

export interface Workout {
  id: number; 
  name: string; 
  exercises: Exercise[]; 
  noOfExercises: number; 
  etaWorkoutTime?: String;
  premium: boolean; 
  private: boolean; 
  _links: Links | null;
  [key: string]: any;
}

export function createWorkout(data: Partial<Workout>): Workout {
  if (!data) {
    throw new Error('Invalid data to create Workout');
  } else if (!data.exercises) {
    throw new Error('Cannot create Workout without exercises');
  } else if (!data.name) {
    throw new Error('Cannot create Workout without a name');
  }
  return {
    id: data.id ?? -1,
    name: data.name ?? '',
    exercises: data.exercises ?? [],
    noOfExercises: data.exercises?.length ?? 0,
    etaWorkoutTime: data.etaWorkoutTime ?? '1h',
    premium: false,
    private: true,
    _links: null,
  };
}