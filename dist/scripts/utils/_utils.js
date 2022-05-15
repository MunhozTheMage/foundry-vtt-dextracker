export default class DextrackerUtils {
    static log(text) {
        console.log(`DexTracker | ${text}`);
    }
    static createSceneControlButton(sceneControlContainer, newTool) {
        sceneControlContainer.tools.push(newTool);
    }
}
export * from "./applicationPaths.js";
