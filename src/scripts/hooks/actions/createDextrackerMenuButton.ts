import { createSceneControlButton } from "../../utils/utils.js";
import { openDexApplication } from "./openDexApplication.js";

export const createDextrackerMenuButton = (
  sceneControlContainer: SceneControl
) => {
  createSceneControlButton(sceneControlContainer, {
    name: "dextracker",
    title: "Dextracker.Title",
    icon: "fas fa-atlas",
    onClick: openDexApplication,
    button: true,
  });
};
