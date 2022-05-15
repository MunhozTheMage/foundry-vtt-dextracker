import DextrackerHooks from "./hooks/hooks.js";
import { log } from "./utils/utils.js";
log("Module was loaded!!!");
Hooks.on("getSceneControlButtons", DextrackerHooks.getSceneControlButtons);
