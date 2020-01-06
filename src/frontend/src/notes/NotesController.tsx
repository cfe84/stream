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

  public getNotesListAsync = async (): Promise<ListComponent<Note>> =>
    this.genericController.getListAsync({
      entityGenerator: () => new Note()
    })

  public displayNotesListAsync = async (): Promise<void> => {
    const component = await this.getNotesListAsync();
    this.deps.uiContainer.mount(component);
  }

  public displayNewNote(): void {
    const addNote = (note: Note) => {
      this.deps.eventBus.publishAsync(new NoteCreatedEvent(note))
        .then(() => this.deps.uiContainer.unmountCurrent());
    }
    const now = new Date(Date.now());
    const note: Note = {
      id: GUID.newGuid(),
      content: "",
      date: now,
      createdDate: now,
      lastEditDate: now,
    }
    const component = <NoteEditor
      actionName="Create"
      note={note}
      onCancel={this.deps.uiContainer.unmountCurrent}
      onValidate={addNote}
    >
    </NoteEditor>;
    this.deps.uiContainer.mount(component);
  }
}