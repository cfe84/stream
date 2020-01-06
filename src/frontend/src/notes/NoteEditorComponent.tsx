import { UIElement, Component } from "../html/index";
import { Note } from "./Note";
import { dateUtils } from "../utils/dateUtils";
import { MarkdownInput, TextInput, DateInput, Button, DateDisplay, PageTitle, MarkdownInputComponent } from "../baseComponents";
import { objectUtils } from "../utils/objectUtils";

export type NoteEditorAction = "Update" | "Create";

export interface NoteEditorComponentProps {
  actionName?: string,
  note: Note,
  onValidate: ((note: Note) => void),
  onCancel: (() => void)
}

export class NoteEditorComponent extends Component {

  constructor(private props: NoteEditorComponentProps) { super() }

  public render = (): UIElement => {
    const note: Note = objectUtils.clone(this.props.note);
    const saveButtonCaption = `${this.props.actionName || "Create"} note`
    const title = `${this.props.actionName || "New note"} ${dateUtils.formatWritable(note.date)}`;
    const draftId = this.props.actionName === "Create" ? "new-note" : this.props.note.id;
    const editorComponent: MarkdownInputComponent = <MarkdownInput caption="Content" object={note} field="content" noteId={draftId} />;
    const onsave = () => {
      note.lastEditDate = new Date();
      editorComponent.clearDraft();
      this.props.onValidate(note);
    }

    return <div>
      <PageTitle title={title} icon="sticky-note" onBack={this.props.onCancel} />
      <DateInput caption="Date" object={note} field="date" />
      {editorComponent}
      <DateDisplay caption="Created date" object={note} field="createdDate" />
      <Button class="mr-2" onclick={onsave} icon="save" text={saveButtonCaption} />
      <Button type="secondary" onclick={this.props.onCancel} icon="times" text="Cancel" />
    </div>;
  }

}

export const NoteEditor = (props: NoteEditorComponentProps) => new NoteEditorComponent(props);
