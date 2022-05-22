import DextrackerHooks from "./hooks";
import DextrackerUtils from "./utils";

DextrackerUtils.log("Module was loaded!!!");

Hooks.on("getSceneControlButtons", DextrackerHooks.getSceneControlButtons);
Hooks.on("init", DextrackerHooks.init);
