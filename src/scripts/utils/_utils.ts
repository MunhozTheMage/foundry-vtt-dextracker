export default class DextrackerUtils {
  public static log(text: string) {
    console.log(`DexTracker | ${text}`);
  }

  public static createSceneControlButton(
    sceneControlContainer: SceneControl,
    newTool: SceneControlTool
  ) {
    sceneControlContainer.tools.push(newTool);
  }
}

export * from "./applicationPaths.js";
