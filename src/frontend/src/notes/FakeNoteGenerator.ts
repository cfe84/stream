import { IFakeGenerator } from "../storage/IFakeGenerator";
import { EventBus } from "../../lib/common/events";
import { NoteCreatedEvent } from "./NoteEvents";
import { GUID } from "../../lib/common/utils/guid";
import { Note } from ".";
import { generateContent } from "../utils/fakeContent";

export class FakeNoteGenerator implements IFakeGenerator {
  constructor() { }


  async generateAsync(eventBus: EventBus): Promise<void> {
    const span = 100000000000;
    const createdDate = (new Date().getTime()) - Math.random() * span;
    const updatedDate = createdDate;
    const date = createdDate
    const note: Note = {
      id: GUID.newGuid(),
      createdDate: new Date(createdDate),
      lastEditDate: new Date(updatedDate),
      date: new Date(date),
      content: generateContent(2 + Math.floor(Math.random() * 8)),
    }

    await eventBus.publishAsync(new NoteCreatedEvent(note));
  }

}