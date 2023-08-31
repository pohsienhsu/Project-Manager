import { Project } from "./Project";
import { ProjectList } from "./ProjectList";
import { Listener, ProjectState } from "./ProjectState";

export class Manager {
  private state: ProjectState = new ProjectState();
  private projectLists: ProjectList[] = [
    new ProjectList("active"),
    new ProjectList("finished"),
  ];
  private static instance: Manager;

  private constructor() {
    console.log(this.projectLists);
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Manager();
    }
    return this.instance;
  }

  public createProject(title: string, description: string, people: number) {
    this.state.addProject(title, description, people);
  }

  public attachListener(listenerFn: Listener<Project>) {
    this.state.addListener(listenerFn);
  }
}
