import { Data } from "../data";
import DextrackerSettingEntries from "../settings";
import { PATHS } from "../utils";

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

const MOCK_Status = "not-seen";

export default class DexApplication extends Application<
  ApplicationOptions & DexApplicationHBSOptions
> {
  constructor() {
    super();
  }

  static get defaultOptions() {
    const options = super.defaultOptions;
    options.template = PATHS.TEMPLATES.DEX;
    options.title = "Dextracker.Title";
    options.resizable = true;
    options.width = 900;
    options.height = 600;
    options.top = 100;
    options.left = 100;
    return options;
  }

  async getData(): Promise<DexApplicationHBSOptions> {
    const creatures = (await Data.CreaturesData!.getCreatures()).creatures;

    return {
      user: {
        color: "user" in game && game.user?.color ? game.user.color : "#ffffff",
        name: "user" in game && game.user?.name ? game.user.name : "",
      },
      dexName: DextrackerSettingEntries.DexName.get(),
      creatures: creatures.map((creature) => ({
        ...creature,
        status: {
          type: MOCK_Status,
          text: { "not-seen": "Not seen", seen: "Seen", caught: "Caught" }[
            MOCK_Status
          ],
        },
      })) as DexApplicationHBSOptions["creatures"],
    };
  }
}
