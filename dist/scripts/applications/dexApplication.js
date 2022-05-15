export default class DexApplication extends Application {
    constructor() {
        super();
    }
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.template = "modules/foundry-vtt-dextracker/templates/dex.hbs";
        options.title = "Test";
        options.resizable = false;
        options.width = 500;
        options.height = 300;
        options.top = 100;
        options.left = 100;
        return options;
    }
}
