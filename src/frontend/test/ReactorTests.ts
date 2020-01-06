import should from "should";
import td from "testdouble";
import { StoreNotesChangesReactor } from "../src/notes";
import { EventBus } from "../lib/common/events";
import { NoteDeletedEvent } from "../src/notes/NoteEvents";
import { INotesStore } from "../src/notes/INotesStore";
