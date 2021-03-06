import { EventBus, IEvent } from "../../lib/common/events/";
import { INotesStore } from "./INotesStore";
import { NoteCreatedEvent, NoteUpdatedEvent, NoteDeletedEvent } from "./NoteEvents";
import { IReactor } from "../storage/IReactor";

export class StoreNotesChangesReactor implements IReactor {
  constructor(private store: INotesStore) { }

  registerReactors(eventBus: EventBus) {
    eventBus.subscribe(NoteCreatedEvent.type, async (event: NoteCreatedEvent) => {
      await this.store.createNoteAsync(event.note);
    });
    eventBus.subscribe(NoteUpdatedEvent.type, async (event: NoteUpdatedEvent) => {
      await this.store.updateNoteAsync(event.note);
    });
    eventBus.subscribe(NoteDeletedEvent.type, async (event: NoteDeletedEvent) => {
      await this.store.deleteNoteAsync(event.note);
    });
  }
}