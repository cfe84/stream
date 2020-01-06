import { Note } from ".";
import { IStore } from "../storage/IStore";
import { INotesStore } from "./INotesStore";

export class NoteStoreAdapter implements IStore<Note> {
  constructor(private store: INotesStore) { }
  getAsync = this.store.getNotesAsync
  createAsync = this.store.createNoteAsync;
  updateAsync = this.store.updateNoteAsync;
}