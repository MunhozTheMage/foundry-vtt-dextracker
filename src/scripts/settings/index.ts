import ImportsAndExportsFormApplication from "../applications/importsAndExportsFormApplication";
import { MODULE_NAME } from "../utils";

class DextrackerSetting<T> {
  name: string;
  options: Parameters<Game["settings"]["register"]>["2"];

  constructor(data: Pick<DextrackerSetting<T>, "name" | "options">) {
    this.name = data.name;
    this.options = data.options;
  }

  init() {
    if (!("settings" in game)) return;
    game.settings.register(MODULE_NAME, this.name, this.options);
  }

  get(): T {
    return (game as Game).settings.get(MODULE_NAME, this.name) as T;
  }
}

class DextrackerSettingMenu {
  name: string;
  options: Parameters<Game["settings"]["registerMenu"]>["2"];

  constructor(data: Pick<DextrackerSettingMenu, "name" | "options">) {
    this.name = data.name;
    this.options = data.options;
  }

  init() {
    if (!("settings" in game)) return;
    game.settings.registerMenu(MODULE_NAME, this.name, this.options);
  }
}

export default abstract class DextrackerSettingEntries {
  public static DexName = new DextrackerSetting<string>({
    name: "dex-name",
    options: {
      name: "Dextracker.Config.DexName.Name",
      hint: "Dextracker.Config.DexName.Hint",
      scope: "world",
      config: true,
      type: String,
      default: "Dex",
    },
  });

  public static ImportsAndExportsMenu = new DextrackerSettingMenu({
    name: "imports-and-exports",
    options: {
      name: "Dextracker.Config.ImportsAndExports.Name",
      label: "Dextracker.Config.ImportsAndExports.Label",
      hint: "Dextracker.Config.ImportsAndExports.Hint",
      icon: "fas fa-folder",
      type: ImportsAndExportsFormApplication,
      restricted: true,
    },
  });

  public static init() {
    DextrackerSettingEntries.DexName.init();
    DextrackerSettingEntries.ImportsAndExportsMenu.init();
  }
}
