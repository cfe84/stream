import { UIElement, Component } from "../html/index";
import { Note } from ".";
import { dateUtils } from "../utils/dateUtils";
import { MarkdownDisplay } from "../baseComponents/MarkdownDisplayComponent";
import { GENERIC_CONTROLLER_EVENT_TYPES } from "../baseComponents/GenericController";

interface NotesListItemProps {
  note: Note,
}

export type ArticleVisibility = "full" | "excerpt";

export class NotesListItemComponent extends Component {
  constructor(private props: NotesListItemProps) { super(); }

  private noteExcerpt?: UIElement;
  private fullNote?: UIElement;
  private listItemElement?: UIElement;

  public render = (): UIElement => {
    this.noteExcerpt = <MarkdownDisplay
      value={this.props.note.content.split("\n")[0] + "..."}
    ></MarkdownDisplay>;
    this.fullNote = <MarkdownDisplay
      value={this.props.note.content}
      class="d-none"
    ></MarkdownDisplay>;

    this.listItemElement = <div class="">
      <div>
        <span class="ml-auto small">{dateUtils.timeSpan(this.props.note.date)}</span>
        <h4>{dateUtils.formatReadable(this.props.note.date)}</h4>
        {this.noteExcerpt}
        {this.fullNote}
      </div>
    </div>
    return this.listItemElement as UIElement;
  }

  public on = (eventType: string, data: any) => {
    if (eventType === GENERIC_CONTROLLER_EVENT_TYPES.DISPLAY_OPTION_CHANGED
      && !!this.noteExcerpt && !!this.fullNote) {
      const visibility = data as ArticleVisibility;
      this.noteExcerpt.props.class = visibility === "excerpt" ? "d-block" : "d-none";
      this.fullNote.props.class = visibility === "full" ? "d-block" : "d-none";
      if (this.listItemElement) {
        this.listItemElement.updateNodeAsync().then(() => { })
      }
    }
  }
}

export const NotesListItem = (props: NotesListItemProps) => new NotesListItemComponent(props);