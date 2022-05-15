import DextrackerApplications from "../applications/_applications.js";
import DextrackerUtils from "../utils/_utils.js";

export default class DextrackerHooks {
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
