import {
  CreatureObject,
  CreatureStatus,
  Data,
  UserCreaturesTrackingObject,
} from "../data";
import { PATHS } from "../utils";
import { BaseApplication } from "./baseApplication";

type CreatureEditApplicationHBSOptions = {
  creature: CreatureObject;
  initialStatus: CreatureStatus;
};

export class CreatureEditApplication extends BaseApplication {
  creature: CreatureEditApplicationHBSOptions["creature"];
  initialStatus: CreatureEditApplicationHBSOptions["initialStatus"];

  onClose = () => {};

  constructor() {
    super();
  }

  static get defaultOptions() {
    const options = super.defaultOptions;
    options.template = PATHS.TEMPLATES.CREATURE_EDIT;
    options.title = "Dextracker.Application.CreatureEdit.Title";
    options.width = 400;
    options.height = 250;
    options.top = 100;
    options.left = 100;
    return options;
  }

  async getData(): Promise<CreatureEditApplicationHBSOptions> {
    return {
      creature: this.creature,
      initialStatus: this.initialStatus,
    };
  }

  public async activateListeners(html: JQuery<HTMLElement>) {
    const { CREATURE_STATUS_SELECT, SAVE_BUTTON } = this.DOM_ELEMENTS;
    CREATURE_STATUS_SELECT.prop("value", this.initialStatus);

    SAVE_BUTTON.on("click", (e) => this._onClickSave(e));
  }

  async close(options?: Application.CloseOptions): Promise<void> {
    super.close();
    this.onClose();
  }

  // ======================================
  // Private Data Manipulation Methods
  // ======================================

  private async _saveCurrentUserTracker(
    newObject: UserCreaturesTrackingObject
  ) {
    const currentUserTracker = await Data.UserCreaturesTrackingDataCollection[
      (game as Game).user!.id
    ]!;

    const currentData = await currentUserTracker.getData();
    await currentUserTracker.setCreaturesTracking({
      ...currentData,
      ...newObject,
    });
  }

  // ======================================
  // Private DOM Manipulation Methods
  // ======================================

  private get DOM_ELEMENTS() {
    return {
      CREATURE_STATUS_SELECT: $<HTMLSelectElement>("#user-creature-status"),
      SAVE_BUTTON: $<HTMLButtonElement>("#save-creature-edit"),
    };
  }

  // ======================================
  // Private Event Methods
  // ======================================

  private async _onClickSave(event: JQuery.ClickEvent<HTMLButtonElement>) {
    console.log(this.DOM_ELEMENTS.CREATURE_STATUS_SELECT.prop("value"));
    await this._saveCurrentUserTracker({
      [this.creature.id]: {
        status: this.DOM_ELEMENTS.CREATURE_STATUS_SELECT.prop("value"),
      },
    });
    this.close();
  }
}
