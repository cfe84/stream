import { UIElement, Component } from "../html/index";
import { Note } from "./Note";
import { MarkdownDisplay } from "../baseComponents/MarkdownDisplayComponent";
import { DateDisplay, Button, PageTitle } from "../baseComponents";
import { dateUtils } from "../utils/dateUtils";
import { GenericController, GENERIC_CONTROLLER_EVENT_TYPES } from "../baseComponents/GenericController";

interface NoteReaderProps {
  note: Note,
  onEdit: ((note: Note) => void),
  onDelete: ((note: Note) => void),
  onBack: (() => void)
}

export class NoteReaderComponent extends Component {

  constructor(public props: NoteReaderProps) { super() }

  public render = (): UIElement => {
    const note = this.props.note;
    const markdownDisplay = <MarkdownDisplay
      value={note.content}
    ></MarkdownDisplay>;
    return <div class="flex-column">
      <PageTitle title={dateUtils.formatReadable(note.date)} icon="sticky-note" onBack={this.props.onBack} />
      <p class="text-center row"><DateDisplay class="col" caption="Created" value={note.createdDate} /><DateDisplay class="col" caption="Last update" value={note.lastEditDate} /></p>
      {markdownDisplay.render()}
      <span class="d-flex">
        <Button type="primary" onclick={() => this.props.onEdit(note)} icon="pen" text="Edit" />
        <Button type="delete" class="ml-auto" onclick={() => this.props.onDelete(note)} icon="trash" text="Delete" />
      </span>
    </div>;
  }

  on = (evtType: string, data: any) => {
    if (evtType === GENERIC_CONTROLLER_EVENT_TYPES.ENTITY_UPDATED) {
      this.props.note = data;
    }
  }

}

export const NoteReader = (props: NoteReaderProps) => new NoteReaderComponent(props);
