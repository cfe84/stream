import { UIContainer, UIElement, Component } from "../html";
import { DashboardComponent, Dashboard } from "./DashboardComponent";
import { EventBus, IEvent } from "../../lib/common/events";
import { IFakeGenerator } from "../storage/IFakeGenerator";
import { NoteCreatedEvent, NoteUpdatedEvent } from "../notes/NoteEvents";
import { NotesController } from "../notes";

export interface DashboardControllerDependencies {
  container: UIContainer;
  notesController: NotesController;
  fakeGenerator: IFakeGenerator;
  eventBus: EventBus;
  debug: boolean;
}

export class DashboardController {

  constructor(private deps: DashboardControllerDependencies) { }

  public displayDashboard() {
    const component: DashboardComponent = <Dashboard
      notesController={this.deps.notesController}
      debug={this.deps.debug}
      onGenerateFakeData={this.generateFakeData}
    ></Dashboard>
    this.deps.container.mount(component);
  }

  private generateFakeData = () => {
    this.deps.fakeGenerator.generateAsync(this.deps.eventBus).then(() => { });
  }
}