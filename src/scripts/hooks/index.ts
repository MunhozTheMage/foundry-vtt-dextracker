import DextrackerApplications from "../applications";
import { Data } from "../data";
import DextrackerUtils from "../utils";
import DextrackerSettingEntries from "../settings";
import { DextrackerGlobal } from "../utils/global";

export default class DextrackerHooks {
  public static async init() {
    DextrackerSettingEntries.init();

    const baseDir = DextrackerHooks._baseDir();

    await DextrackerUtils.ensureDirectoryExists("data", baseDir);
    await DextrackerUtils.ensureDirectoryExists("data", `${baseDir}/userData`);

    await Data.init(baseDir);
  }

  public static async ready() {
    const baseDir = DextrackerHooks._baseDir();

    await Data.postInit(baseDir);

    DextrackerGlobal.finishLoading();
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

  private static _baseDir() {
    const currentWorld = (game as Game).world.id;
    return `./worlds/${currentWorld}/dextracker`;
  }
}
