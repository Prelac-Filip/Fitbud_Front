import type { Links } from "./Links";

export interface Exercise {
  id: string;
  name: string;
  bodyParts: string[] | string;
  specificBodyParts: string[] | string;
  _links: Links;
  [key: string]: any;
}