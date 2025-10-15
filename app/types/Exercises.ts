import type { Exercise } from "./Exercise";
import type { Links } from "./Links";

export interface Exercises {
  _embedded: {
    exerciseList: Exercise[];
  };
  _links: Links;
  [key: string]: any;
}