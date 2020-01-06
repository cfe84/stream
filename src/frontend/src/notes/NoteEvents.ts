import { IEvent, ITypedEvent } from "../../lib/common/events";
import { Note, NoteObjectType } from "./Note";
import { EventInfo } from "../../lib/common/events/EventInfo";

export class NoteCreatedEvent implements ITypedEvent<Note> {
  get entity(): Note { return this.note };
  set entity(note: Note) { this.note = note };
  static type: string = "noteCreatedEvent";
  info = new EventInfo(NoteCreatedEvent.type, NoteObjectType, this.note.id);
  constructor(public note: Note) { }
}

export class NoteUpdatedEvent implements ITypedEvent<Note> {
  get entity(): Note { return this.note };
  set entity(note: Note) { this.note = note };
  static type: string = "noteUpdatedEvent";
  info = new EventInfo(NoteUpdatedEvent.type, NoteObjectType, this.note.id);
  constructor(public note: Note) { }
}

export class NoteDeletedEvent implements ITypedEvent<Note> {
  get entity(): Note { return this.note };
  set entity(note: Note) { this.note = note };
  static type: string = "noteDeletedEvent";
  info = new EventInfo(NoteDeletedEvent.type, NoteObjectType, this.note.id);
  constructor(public note: Note) { }
}