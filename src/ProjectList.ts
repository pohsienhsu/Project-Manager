import { Component } from "./Component";
import { Manager } from "./Manager";
import { Project, ProjectStatus } from "./Project";

class ProjectListItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project;

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  configure() {}

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = `${this.project.people}`;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

// ProjectList class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  private assignedProejcts: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProejcts = [];

    this.renderContent();
    this.configure();
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " Project";
  }

  configure() {
    Manager.getInstance().attachListener((projects: any[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        } else {
          return prj.status === ProjectStatus.Finished;
        }
      });

      this.assignedProejcts = relevantProjects;
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listElement = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listElement.innerHTML = "";
    for (const prjItem of this.assignedProejcts) {
      new ProjectListItem(this.element.id, prjItem);
    }
  }
}
