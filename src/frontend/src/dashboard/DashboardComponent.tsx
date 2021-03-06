import { UIElement, Component, UIContainer } from "../html/index";
import { NotesController } from "../notes";

interface DashboardProps {
  notesController: NotesController
  onGenerateFakeData?: () => void,
  debug?: boolean
}

export class DashboardComponent extends Component {
  constructor(public props: DashboardProps) { super() }

  public render = async (): Promise<UIElement> => {
    const noteList = await this.props.notesController.getNotesListAsync();
    const component: UIElement = <div class="row">
      <div class="col-sm">
        {noteList}
      </div>
    </div>;

    if (this.props.debug) {
      return <div>
        {component}
        <div class="row mt-5">
          <div class="col-sm">
            <button class="btn btn-info" onclick={this.props.onGenerateFakeData}>Generate fake data</button>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
    } else
      return component;
  }
}

export const Dashboard = (props: DashboardProps) => new DashboardComponent(props);

