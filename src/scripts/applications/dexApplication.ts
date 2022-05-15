import { PATHS } from "../utils/_utils.js";

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

const MOCK_CreaturesData = [
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    name: "Bulbasaur",
    status: "seen",
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
    name: "Ivysaur",
    status: "not-seen",
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
    name: "Venusaur",
    status: "not-seen",
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    name: "Charmander",
    status: "caught",
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
    name: "Charmeleon",
    status: "not-seen",
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
    name: "Charizard",
    status: "not-seen",
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    name: "Squirtle",
    status: "seen",
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
    name: "Wartortle",
    status: "not-seen",
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
    name: "Blastoise",
    status: "not-seen",
  },
];

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
    options.width = 500;
    options.height = 300;
    options.top = 100;
    options.left = 100;
    return options;
  }

  getData(): DexApplicationHBSOptions {
    return {
      user: {
        color: "user" in game && game.user?.color ? game.user.color : "#ffffff",
        name: "user" in game && game.user?.name ? game.user.name : "",
      },
      dexName: "Dex",
      creatures: MOCK_CreaturesData.map((creature) => ({
        ...creature,
        status: {
          type: creature.status,
          text: { "not-seen": "Not seen", seen: "Seen", caught: "Caught" }[
            creature.status
          ],
        },
      })) as DexApplicationHBSOptions["creatures"],
    };
  }
}
