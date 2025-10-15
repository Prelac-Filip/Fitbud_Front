import type { Exercise } from "./Exercise";
import type { Links } from "./Links";

export interface Workout {
  id: number; 
  name: string; 
  exercises: Exercise[]; 
  noOfExercises: number; 
  premium: boolean; 
  private: boolean; 
  _links: Links;
  [key: string]: any;
}