import { Note, NoteEditorComponent } from ".";
import { GUID } from "../../lib/common/utils/guid";
import { UIElement, UIContainer, Component } from "../html";
import { INotesStore } from "./INotesStore";
import { NoteEditor } from "./NoteEditorComponent";
import { EventBus } from "../../lib/common/events/";
import { NoteCreatedEvent, NoteUpdatedEvent, NoteDeletedEvent } from "./NoteEvents";
import { NoteReaderComponent, NoteReader } from "./NoteReaderComponent";
import { ConfirmationDialog } from "../baseComponents/ConfirmationDialog";
import { List, ListComponent } from "../baseComponents/ListComponent";
import { GenericController } from "../baseComponents/GenericController";
import { NoteComponentFactory } from "./NoteComponentFactory";
import { NoteStoreAdapter } from "./NoteStoreAdapter";
import { NoteEventFactory } from "./NoteEventFactory";
import { Button } from "../baseComponents";

export interface NotesControllerDependencies {
  uiContainer: UIContainer,
  db: INotesStore,
  eventBus: EventBus
}

export type notesFilter = (note: Note) => boolean;

export class NotesController {
  private genericController: GenericController<Note>;
  constructor(private deps: NotesControllerDependencies) {
    this.genericController = new GenericController({
      componentFactory: new NoteComponentFactory(),
      db: new NoteStoreAdapter(this.deps.db),
      eventBus: this.deps.eventBus,
      eventFactory: new NoteEventFactory(),
      uiContainer: this.deps.uiContainer
    })
  }

  public getNotesListAsync = async (): Promise<ListComponent<Note>> => {
    const list = await this.genericController.getListAsync({});
    return <div>
      <Button onclick={() => this.genericController.mountCreate(() => new Note())} text="Add" icon="plus" />
      {list}
    </div>
  }

  public displayNotesListAsync = async (): Promise<void> => {
    const component = await this.getNotesListAsync();
    this.deps.uiContainer.mount(component);
  }

}