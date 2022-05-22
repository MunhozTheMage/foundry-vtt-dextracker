import DextrackerApplications from "../applications";
import { Data } from "../data";
import DextrackerUtils from "../utils";
import DextrackerSettingEntries from "../settings";

export default class DextrackerHooks {
  public static async init() {
    if (!("world" in game)) return;

    DextrackerSettingEntries.init();

    const currentWorld = game.world.id;
    const baseDir = `./worlds/${currentWorld}/dextracker`;

    await DextrackerUtils.ensureDirectoryExists("data", baseDir);
    await Data.init(baseDir);
  }

  public static getSceneControlButtons(controls: SceneControl[]) {
    const tokenControls = controls.find((control) => control.name === "token");

    if (tokenControls) {
      DextrackerHooks._createDextrackerMenuButton(tokenControls);
    }
  }

  // ===============================================
  // Private methods
  // ===============================================

  private static _createDextrackerMenuButton = (
    sceneControlContainer: SceneControl
  ) => {
    DextrackerUtils.createSceneControlButton(sceneControlContainer, {
      name: "dextracker",
      title: "Dextracker.Title",
      icon: "fas fa-atlas",
      onClick: () => DextrackerApplications.DexApplication.render(true),
      button: true,
    });
  };
}
