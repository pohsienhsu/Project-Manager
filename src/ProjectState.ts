// Project State Management

import { Project } from "./Project";

export type Listener = (items: Project[]) => void;
export class ProjectState {
  private listeners: Listener[] = [];
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
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }
}