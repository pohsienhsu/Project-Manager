// Project State Management

import { Project } from "./Project";

export type Listener<T> = (items: T[]) => void;

class State<T> {
  private listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState {
  private projects: Project[] = [];

  constructor() {}

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people
    );

    this.projects.push(newProject);
    // for (const listenerFn of this.listeners) {
    //   listenerFn(this.projects.slice());
    // }
  }
}