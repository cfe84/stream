import { IComponentFactory } from "../baseComponents/IComponentFactory";
import { Note } from ".";
import { Component } from "../html";
import { NoteReader } from "./NoteReaderComponent";
import { NoteEditor } from "./NoteEditorComponent";
import { NotesListItem } from "./NotesListItemComponent";
import { FilterFunction } from "../baseComponents/GenericController";
import { NoteFilter } from "./NoteFilterComponent";
import { NoteViewControl } from "./NoteViewControlComponent";

export class NoteComponentFactory implements IComponentFactory<Note> {
  createListItemComponent = (element: Note): Component =>
    NotesListItem({
      note: element
    });
  createEditComponent = (element: Note, onCancel: () => void, onValidate: (entity: Note) => void): Component =>
    NoteEditor({
      note: element,
      onCancel,
      onValidate,
      actionName: "Update"
    });
  createReadComponent = (element: Note, onBack: () => void, onEdit: (entity: Note) => void, onDelete: (entity: Note) => void): Component =>
    NoteReader({
      note: element,
      onBack,
      onEdit,
      onDelete: () => onDelete(element)
    });
  createCreateComponent = (element: Note, onCancel: () => void, onValidate: (entity: Note) => void): Component =>
    NoteEditor({
      note: element,
      onCancel,
      onValidate,
      actionName: "Create"
    });
  createListFilterComponent = (onFilterChanged: (filter: FilterFunction<Note>) => void): Component =>
    NoteFilter({
      onFilterChanged
    });
  createListViewControlComponent = (onViewControlChanged: (options: any) => void): Component =>
    NoteViewControl({
      onViewControlChanged
    })
}