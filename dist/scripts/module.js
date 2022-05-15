import DextrackerHooks from "./hooks/_hooks.js";
import DextrackerUtils from "./utils/_utils.js";
DextrackerUtils.log("Module was loaded!!!");
Hooks.on("getSceneControlButtons", DextrackerHooks.getSceneControlButtons);
