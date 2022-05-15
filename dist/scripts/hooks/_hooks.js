import DextrackerApplications from "../applications/_applications.js";
import DextrackerUtils from "../utils/_utils.js";
export default class DextrackerHooks {
    static getSceneControlButtons(controls) {
        const tokenControls = controls.find((control) => control.name === "token");
        if (tokenControls) {
            DextrackerHooks._createDextrackerMenuButton(tokenControls);
        }
    }
}
// ===============================================
// Private methods
// ===============================================
DextrackerHooks._createDextrackerMenuButton = (sceneControlContainer) => {
    DextrackerUtils.createSceneControlButton(sceneControlContainer, {
        name: "dextracker",
        title: "Dextracker.Title",
        icon: "fas fa-atlas",
        onClick: () => DextrackerApplications.DexApplication.render(true),
        button: true,
    });
};
