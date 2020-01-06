import { IEventFactory, ITypedEvent } from "../../lib/common/events";
import { Note } from ".";
import { NoteCreatedEvent, NoteUpdatedEvent, NoteDeletedEvent } from "./NoteEvents";

export class NoteEventFactory implements IEventFactory<Note> {
  createCreatedEvent = (entity: Note): ITypedEvent<Note> => new NoteCreatedEvent(entity);
  createUpdatedEvent = (entity: Note): ITypedEvent<Note> => new NoteUpdatedEvent(entity);
  createDeletedEvent = (entity: Note): ITypedEvent<Note> => new NoteDeletedEvent(entity);
  createdEventType: string = NoteCreatedEvent.type;
  updatedEventType: string = NoteUpdatedEvent.type;
  deletedEventType: string = NoteDeletedEvent.type;


}