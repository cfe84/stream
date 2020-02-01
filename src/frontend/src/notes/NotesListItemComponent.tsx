import { UIElement, Component } from "../html/index";
import { Note } from ".";
import { dateUtils } from "../utils/dateUtils";
import { MarkdownDisplay } from "../baseComponents/MarkdownDisplayComponent";

interface NotesListItemProps {
  note: Note,
}

class NotesListItemComponent extends Component {
  constructor(private props: NotesListItemProps) { super(); }

  public render = (): UIElement => {
    return <div class="">
      <div>
        <span class="ml-auto small">{dateUtils.timeSpan(this.props.note.date)}</span>
        <h4>{dateUtils.formatReadable(this.props.note.date)}</h4>
      </div>
      <MarkdownDisplay
        value={this.props.note.content.split("\n")[0] + "..."}
        class=""
      ></MarkdownDisplay>
    </div>
  }
}

export const NotesListItem = (props: NotesListItemProps) => new NotesListItemComponent(props);