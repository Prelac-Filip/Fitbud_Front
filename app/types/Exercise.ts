import type { Links } from "./Links";

export interface Exercise {
  id: string;
  name: string;
  bodyParts: string[] | string;
  specificBodyParts: string[] | string;
  repetitions: number;
  sets: number;
  _links: Links;
  [key: string]: any;
}