import { createDextrackerMenuButton } from "./actions";
export default class DextrackerHooks {
    static getSceneControlButtons(controls) {
        const tokenControls = controls.find((control) => control.name === "token");
        if (tokenControls) {
            createDextrackerMenuButton(tokenControls);
        }
    }
}
