import { createDextrackerMenuButton } from "./actions/actions.js";
export default class DextrackerHooks {
    static getSceneControlButtons(controls) {
        const tokenControls = controls.find((control) => control.name === "token");
        if (tokenControls) {
            createDextrackerMenuButton(tokenControls);
        }
    }
}
