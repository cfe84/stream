import { Component } from "../html";
import { TextInput } from "../baseComponents";
import { FilterFunction } from "../baseComponents/GenericController";
import { Note } from ".";

export interface NoteFilterComponentProps {
  onFilterChanged(filter: FilterFunction<Note>): void;
}

export class NoteFilterComponent extends Component {
  constructor(private props: NoteFilterComponentProps) {
    super()
  }

  private onFilterChanged = (value: string): void => {
    this.props.onFilterChanged(
      (note => note.content.toLowerCase().indexOf(value) >= 0));
  }

  render() {
    return <div>
      <TextInput caption="Filter" onchange={this.onFilterChanged}></TextInput>
    </div>
  }
}

export const NoteFilter = (props: NoteFilterComponentProps) => new NoteFilterComponent(props)