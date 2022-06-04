import DextrackerHooks from "./hooks";

Hooks.on("init", DextrackerHooks.init);
Hooks.on("ready", DextrackerHooks.ready);
Hooks.on("getSceneControlButtons", DextrackerHooks.getSceneControlButtons);
