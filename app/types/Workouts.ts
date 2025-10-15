import type { Links } from "./Links";
import type { Workout } from "./Workout";

export interface Workouts {
  _embedded: {
    workoutList: Workout[];
  };
  _links: Links;
  [key: string]: any;
}