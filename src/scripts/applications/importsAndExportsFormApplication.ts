import DextrackerUtils, { PATHS } from "../utils";
import { Data } from "../data";

type DexApplicationHBSOptions = {
  user: {
    color: string;
    name: string;
  };
  creatures: {
    image: string;
    name: string;
    status: {
      type: "seen" | "not-seen" | "caught";
      text: string;
    };
  }[];
  dexName: string;
};

export default class ImportsAndExportsFormApplication extends FormApplication {
  constructor() {
    super({});
  }

  static get defaultOptions() {
    const options = super.defaultOptions;
    options.template = PATHS.TEMPLATES.IMPORTS_AND_EXPORTS;
    options.title = "Dextracker.Application.ImportsAndExports.Title";
    options.resizable = true;
    options.width = 500;
    options.height = 300;
    options.top = 100;
    options.left = 100;
    return options;
  }

  public activateListeners(html: JQuery<HTMLElement>) {
    super.activateListeners(html);

    const {
      IMPORT_MODE_SELECT,
      IMPORT_BUTTON,
      EXPORT_BUTTON,
      IMPORT_FILE_INPUT,
    } = this.DOM_ELEMENTS;

    IMPORT_MODE_SELECT.on("change", (e) => this._onChangeImportMode(e));
    IMPORT_BUTTON.on("click", (e) => this._onClickImport(e));
    EXPORT_BUTTON.on("click", (e) => this._onClickExport(e));
    IMPORT_FILE_INPUT.on("change", () => this._onUpdateImportFile());
  }

  protected async _updateObject(): Promise<unknown> {
    return undefined;
  }

  // ======================================
  // Private DOM Manipulation Methods
  // ======================================

  private get DOM_ELEMENTS() {
    return {
      WARNING_TEXT: $<HTMLParagraphElement>("#creatures-warning"),
      IMPORT_BUTTON: $<HTMLButtonElement>("#creatures-import"),
      EXPORT_BUTTON: $<HTMLButtonElement>("#creatures-export"),
      IMPORT_MODE_SELECT: $<HTMLSelectElement>("#creatures-import-mode"),
      IMPORT_FILE_INPUT: $<HTMLInputElement>("#creatures-import-file"),
    };
  }

  private _setCreaturesWarningShowing(show: boolean) {
    const { WARNING_TEXT } = this.DOM_ELEMENTS;
    show ? WARNING_TEXT.show() : WARNING_TEXT.hide();
  }

  private _updateImportButtonEnabledState() {
    const { IMPORT_FILE_INPUT, IMPORT_BUTTON } = this.DOM_ELEMENTS;
    IMPORT_BUTTON.prop("disabled", IMPORT_FILE_INPUT.val() === "");
  }

  // ======================================
  // Private Data Manipulation Methods
  // ======================================

  private async _exportCreaturesData() {
    const jsonData = await Data.CreaturesData.exportCurrentData();

    DextrackerUtils.saveFileLocaly(
      [jsonData],
      "application/json",
      "fvtt-dextracker-creatures.json"
    );
  }

  private async _loadImportFile() {
    const { IMPORT_FILE_INPUT } = this.DOM_ELEMENTS;

    if (IMPORT_FILE_INPUT.val() === "") throw new Error("No file to upload");

    const file = await DextrackerUtils.loadLocalFile(
      IMPORT_FILE_INPUT.prop("files")[0]
    );

    return file;
  }

  private async _importCreaturesData(json: string) {
    Data.CreaturesData.importFromObject(JSON.parse(json));
  }

  // ======================================
  // Private Event Methods
  // ======================================

  private _onChangeImportMode(event: JQuery.ChangeEvent<HTMLSelectElement>) {
    const newValue = event.target.value;

    if (newValue === "merge") {
      this._setCreaturesWarningShowing(false);
      return;
    }

    if (newValue === "overwrite") {
      this._setCreaturesWarningShowing(true);
      return;
    }
  }

  private async _onClickImport(event: JQuery.ClickEvent<HTMLButtonElement>) {
    event.preventDefault();

    const jsonFile = await this._loadImportFile();
    this._importCreaturesData(jsonFile);
  }

  private _onClickExport(event: JQuery.ClickEvent<HTMLButtonElement>) {
    event.preventDefault();
    this._exportCreaturesData();
  }

  private _onUpdateImportFile() {
    this._updateImportButtonEnabledState();
  }
}
