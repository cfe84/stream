import { Note } from "../notes";
import { IWholeStore } from "../storage/IWholeStore";
import { promises as fsAsync, default as fs } from "fs";
import { JsonSerializer } from "../../lib/common/utils/JsonSerializer";

class MyArray<T> {
  [index: string]: T
}

class Db {
  notes = new MyArray<Note>();
  toString(): string {
    return JSON.stringify(this);
  }
  public static deserialize(serializedStore: string): Db {
    const deserializedDb = JsonSerializer.deserialize(serializedStore) as Db;
    Object.setPrototypeOf(deserializedDb, new Db());
    return deserializedDb;
  }
}

type KeyFinder<T> = (entity: T) => string;

class ArrayManager<T> {
  constructor(private array: MyArray<T>, private keyFinder: KeyFinder<T>, private store: FsStore) { }
  addAsync = async (entity: T) => {
    const key: string = this.keyFinder(entity);
    if (this.array[key] === undefined) {
      this.array[key] = entity;
      await this.store.commitChangesAsync();
    } else {
      throw Error("Duplicate entry");
    }
  }

  updateAsync = async (entity: T) => {
    const key: string = this.keyFinder(entity);
    this.array[key] = entity;
    await this.store.commitChangesAsync();
  }

  getAsync = async (): Promise<T[]> => {
    return Object.entries(this.array).map((entry) => entry[1]);
  }

  deleteAsync = async (entity: T) => {
    const key: string = this.keyFinder(entity);
    if (this.array[key] !== undefined) {
      delete this.array[key];
      await this.store.commitChangesAsync();
    } else {
      throw Error("Entry doesn't exist");
    }
  }
}

export class FsStore implements IWholeStore {

  public static async loadAsync(file: string): Promise<FsStore> {
    let db: Db;
    const fileExists = fs.existsSync(file);
    if (fileExists) {
      const serializedJson = (await fsAsync.readFile(file)).toString();
      db = Db.deserialize(serializedJson);
    } else {
      db = new Db();
    }
    return new FsStore(file, db);
  }

  notes: ArrayManager<Note>;

  private constructor(private file: string, private db: Db) {
    this.notes = new ArrayManager(db.notes, (note: Note) => note.id, this);
  }

  commitChangesAsync = async () => {
    const serialized = this.db.toString();
    await fsAsync.writeFile(this.file, serialized);
  }

  getNotesAsync = (): Promise<Note[]> => this.notes.getAsync()
  createNoteAsync = (note: Note): Promise<void> => this.notes.addAsync(note);
  updateNoteAsync = (note: Note): Promise<void> => this.notes.updateAsync(note);
  deleteNoteAsync = (note: Note): Promise<void> => this.notes.deleteAsync(note);
}
