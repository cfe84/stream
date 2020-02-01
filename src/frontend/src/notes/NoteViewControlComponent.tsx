import { Component } from "../html";
import { Select } from "../baseComponents";

export interface NoteViewControlComponentProps {
  onViewControlChanged(options: any): void;
}

export class NoteViewControlComponent extends Component {
  constructor(private props: NoteViewControlComponentProps) {
    super()
  }

  private onViewControlChanged = (value: string): void => {
    this.props.onViewControlChanged(value.toLocaleLowerCase());
  }

  render() {
    return <div>
      <Select caption="Display"
        values={["Full", "Excerpt"]}
        value="Excerpt"
        onchange={this.onViewControlChanged} />
    </div>
  }
}

export const NoteViewControl = (props: NoteViewControlComponentProps) => new NoteViewControlComponent(props)