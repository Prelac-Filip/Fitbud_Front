export interface Links {
  _links: {
    self: { href: string };
    workouts: { href: string };
    bodyPartExercises: { href: string };
    exercises: { href: string };
  };
  [key: string]: any;
}