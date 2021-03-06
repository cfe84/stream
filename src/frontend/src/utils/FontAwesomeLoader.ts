import { library, dom } from "@fortawesome/fontawesome-svg-core";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faPen, faUser, faStickyNote, faArrowLeft, faTimes, faSave, faPlus, faComments, faTrash, faCheck,
  faCalendarDay, faMapMarker, faInfoCircle, faInfo, faTasks, faStream
} from "@fortawesome/free-solid-svg-icons";

import {
  faCheckSquare, faSquare
} from "@fortawesome/free-regular-svg-icons"

export class FontAwesomeLoader {
  static loadFontAwesome() {
    library.add(faUser, faPen, faStickyNote, faArrowLeft, faTimes, faSave, faPlus, faComments, faTrash, faCheck, faCalendarDay
      , faMapMarker, faInfoCircle, faTasks, faCheckSquare, faSquare, faStream);
    dom.watch();
  }
}