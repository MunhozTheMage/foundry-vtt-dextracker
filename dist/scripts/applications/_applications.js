import DexApplication from "./dexApplication.js";
const _DexApplication = new DexApplication();
export default class DextrackerApplications {
    static get DexApplication() {
        return _DexApplication;
    }
}
