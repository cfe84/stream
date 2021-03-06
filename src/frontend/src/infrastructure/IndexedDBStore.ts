import { Note } from "../notes";
import { IWholeStore } from "../storage/IWholeStore";
import { objectUtils } from "../utils/objectUtils";

const DB_NAME: string = "streamdb";
const DB_VERSION: number = 6;
const OBJECTSTORE_NOTES: string = "notes";

const getTarget = <T>(evt: any): T => (evt.target as T)

type transactionType = "readwrite" | "readonly";

class AsyncIndexedDB {
  private constructor(private db: IDBDatabase) { }

  static OpenDbAsync = (dbName: string,
    dbVersion: number,
    upgradeCallback: ((db: IDBDatabase) => void)): Promise<AsyncIndexedDB> =>
    new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        return reject(Error("Browser does not support IndexedDB"));
      }
      const openRequest = window.indexedDB.open(dbName, dbVersion);
      openRequest.onupgradeneeded = evt => upgradeCallback(getTarget<IDBOpenDBRequest>(evt).result);
      openRequest.onsuccess = (evt) => {
        resolve(new AsyncIndexedDB(getTarget<IDBOpenDBRequest>(evt).result))
      };
      openRequest.onerror = (evt) => {
        reject(getTarget<IDBOpenDBRequest>(evt).error);
      }
    });

  private createDbTransaction(storeName: string, mode: transactionType = "readonly") {
    const transaction = this.db.transaction(storeName, mode);
    const objectStore = transaction.objectStore(storeName);
    return objectStore;
  }

  private static addEventHandlersToRequest<T>(
    request: IDBRequest<T>,
    successHandler: ((request: IDBRequest<T>) => void),
    failureHandler: ((request: IDBRequest<T>) => void)) {
    request.onsuccess = (event: Event) => successHandler(event.target as IDBRequest);
    request.onerror = (event: Event) => failureHandler(event.target as IDBRequest);
  }

  public getAllAsync = <T>(storeName: string): Promise<T[]> =>
    new Promise((resolve, reject) => {
      const objectStore = this.createDbTransaction(storeName);
      const request = objectStore.getAll();
      AsyncIndexedDB.addEventHandlersToRequest(request,
        (request: IDBRequest<T[]>) => resolve(request.result),
        (request: IDBRequest<T[]>) => reject(request.error));
    });

  public getEntityAsync = <T>(storeName: string, key: string): Promise<T> =>
    new Promise((resolve, reject) => {
      const objectStore = this.createDbTransaction(storeName);
      const request = objectStore.get(key);
      AsyncIndexedDB.addEventHandlersToRequest(request,
        (request: IDBRequest<T>) => resolve(request.result),
        (request: IDBRequest<T>) => reject(request.error));
    });

  public createEntityAsync = <T>(storeName: string, entity: T): Promise<void> =>
    new Promise((resolve, reject) => {
      entity = objectUtils.clone(entity, true);
      const objectStore = this.createDbTransaction(storeName, "readwrite");
      const request = objectStore.add(entity);
      AsyncIndexedDB.addEventHandlersToRequest(request,
        (request: IDBRequest<IDBValidKey>) => resolve(),
        (request: IDBRequest<IDBValidKey>) => reject(request.error));
    });

  public putEntityAsync = <T>(storeName: string, entity: T): Promise<T[]> =>
    new Promise((resolve, reject) => {
      const objectStore = this.createDbTransaction(storeName, "readwrite");
      entity = objectUtils.clone(entity, true);
      const request = objectStore.put(entity);
      AsyncIndexedDB.addEventHandlersToRequest(request,
        (request: IDBRequest<IDBValidKey>) => resolve(),
        (request: IDBRequest<IDBValidKey>) => reject(request.error));
    });

  public deleteEntityAsync = (storeName: string, entityId: string): Promise<void> =>
    new Promise((resolve, reject) => {
      const objectStore = this.createDbTransaction(storeName, "readwrite");
      const request = objectStore.delete(entityId);
      AsyncIndexedDB.addEventHandlersToRequest(request,
        (request: IDBRequest<undefined>) => resolve(),
        (request: IDBRequest<undefined>) => reject(request.error));
    });
}

export class IndexedDBStore implements IWholeStore {


  private static createObjectStore(db: IDBDatabase, storeName: string, parameters: IDBObjectStoreParameters): IDBObjectStore | null {
    const storeAlreadyExists = db.objectStoreNames.contains(storeName)
    if (storeAlreadyExists) {
      return null;
    } else {
      const store = db.createObjectStore(storeName, parameters);
      return store;
    }
  }
  private static updateDatabase(db: IDBDatabase) {
    console.log(`Creating db in version ${DB_VERSION}`);
    const stores = [
      { name: OBJECTSTORE_NOTES, key: "id", index: "personid" },
    ];
    stores.forEach((storeInfo) => {
      const store = IndexedDBStore.createObjectStore(db, storeInfo.name, { keyPath: storeInfo.key });
      if (store)
        store.createIndex(storeInfo.index, storeInfo.index, { unique: false });
    });
  }

  static OpenDbAsync = async (): Promise<IndexedDBStore> => {
    const db = await AsyncIndexedDB.OpenDbAsync(DB_NAME, DB_VERSION, IndexedDBStore.updateDatabase);
    return new IndexedDBStore(db);
  }

  private constructor(private db: AsyncIndexedDB) {
  }

  public getNotesAsync = async (): Promise<Note[]> =>
    (await this.db.getAllAsync<Note>(OBJECTSTORE_NOTES));


  public createNoteAsync = async (note: Note): Promise<void> => {
    await this.db.createEntityAsync(OBJECTSTORE_NOTES, note);
  }

  public updateNoteAsync = async (note: Note): Promise<void> => {
    await this.db.putEntityAsync(OBJECTSTORE_NOTES, note);
  }

  public deleteNoteAsync = async (note: Note): Promise<void> => {
    await this.db.deleteEntityAsync(OBJECTSTORE_NOTES, note.id);
  }

}