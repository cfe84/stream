import { IEntity } from "../../lib/common/entities";
import { GUID } from "../../lib/common/utils/guid";

export type NoteId = string;
export const NoteObjectType = "Note";
export class Note implements IEntity {
  createdDate: Date;
  lastEditDate: Date;
  date: Date;
  content: string;
  id: NoteId;
  constructor(content: string = "") {
    this.createdDate = this.lastEditDate = this.date = new Date();
    this.content = content;
    this.id = GUID.newGuid();
  }
}