import { clamp, flatten } from "rambda";
import { CreatureObject, CreaturesData, CreatureStatus, Data } from "../data";
import DextrackerSettingEntries from "../settings";
import { PATHS } from "../utils";
import { Filter } from "../utils/filter";
import { BaseApplication } from "./baseApplication";
import { CreatureEditApplication } from "./creatureEditApplication";

type DexApplicationHBSOptions = {
  user: {
    color: string;
    name: string;
  };
  creatures: {
    image: string;
    name: string;
    status: {
      type: CreatureStatus;
      text: string;
    };
  }[];
  dexName: string;
  currentPage: number;
  totalPages: number;
};

type DexApplicationSearch = {
  text: Filter<string | undefined>;
};

export default class DexApplication extends BaseApplication<
  ApplicationOptions & DexApplicationHBSOptions
> {
  private creaturesCache?: ReturnType<
    typeof Data["CreaturesData"]["paginateCreatures"]
  >;
  private editCreatureApp = new CreatureEditApplication();

  currentPage: number;
  search: DexApplicationSearch;

  constructor() {
    super();
    this._resetApplicationState();
    this.editCreatureApp.onClose = () => this.render();
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
    const paginatedCreatures = await this._getCreatures();

    const creatures = await this._getTrackedCreatures();

    return {
      user: {
        color: "user" in game && game.user?.color ? game.user.color : "#ffffff",
        name: "user" in game && game.user?.name ? game.user.name : "",
      },
      dexName: DextrackerSettingEntries.DexName.get(),
      creatures: creatures.map(({ status, ...creature }) => ({
        ...creature,
        status: {
          type: status,
          text: { "not-seen": "Not seen", seen: "Seen", caught: "Caught" }[
            status
          ],
        },
      })) as DexApplicationHBSOptions["creatures"],
      currentPage: this.currentPage + 1,
      totalPages: paginatedCreatures.pages,
    };
  }

  public async activateListeners(html: JQuery<HTMLElement>) {
    super.activateListeners(html);

    await this._applicationFinishedRendering();

    const {
      PAGINATION_PREV,
      PAGINATION_NEXT,
      PAGINATION_INPUT_BUTTON,
      SEARCH_BUTTON,
      CREATURES_BUTTONS,
    } = this.DOM_ELEMENTS;

    PAGINATION_PREV.on("click", (e) => this._onClickPrev(e));
    PAGINATION_NEXT.on("click", (e) => this._onClickNext(e));
    PAGINATION_INPUT_BUTTON.on("click", (e) => this._onClickGoToPage(e));
    SEARCH_BUTTON.on("click", (e) => this._onClickSearch(e));
    CREATURES_BUTTONS.on("click", (e) => this._onClickEditCreatureEntry(e));
  }

  async close(options?: Application.CloseOptions): Promise<void> {
    this._resetApplicationState();
    super.close(options);
  }

  private _resetApplicationState() {
    this.currentPage = 0;
    this.creaturesCache = undefined;
    this.search = {
      text: new Filter<string | undefined>(undefined),
    };
  }

  private async _applicationFinishedRendering() {
    await this._disablePaginationButtonIfNeeded();
    this._setSearchTextToCurrentValue();
  }

  private _updateFilters() {
    Object.values(this.search).forEach((filter) => {
      filter.updateValue();
    });
  }

  private _filtersChanged() {
    return Object.values(this.search).every((filter) => filter.filterChanged());
  }

  // ======================================
  // Private Data Manipulation Methods
  // ======================================

  private async _getCreatures() {
    if (this.creaturesCache === undefined || this._filtersChanged()) {
      this._updateFilters();

      const { creatures } = await Data.CreaturesData.getData();
      const filteredCreatures = this._filterCreatures(creatures);

      this.creaturesCache =
        Data.CreaturesData.paginateCreatures(filteredCreatures);
    }

    return this.creaturesCache;
  }

  private _filterCreatures(creatures: CreaturesData["creatures"]) {
    return creatures.filter((creature) =>
      this.search.text.value
        ? creature.name
            .toLowerCase()
            .includes(this.search.text.value?.toLowerCase())
        : true
    );
  }

  private async _getTrackedCreatures(): Promise<
    (CreatureObject & { status: CreatureStatus })[]
  > {
    const trackers = await Data.UserCreaturesTrackingDataCollection[
      (game as Game).user!.id
    ]!.getData();

    console.log(trackers);

    const { paginatedCreatures } = await this._getCreatures();
    const creatures = paginatedCreatures[this.currentPage]!;

    return creatures.map((creature) => ({
      ...creature,
      status: trackers[creature.id]?.status || "not-seen",
    }));
  }

  private async _findCreatureById(id: number) {
    const { paginatedCreatures } = await this._getCreatures();
    const creatures = flatten<CreatureObject>(paginatedCreatures);
    return creatures.find((creature) => creature.id === id);
  }

  // ======================================
  // Private DOM Manipulation Methods
  // ======================================

  private get DOM_ELEMENTS() {
    return {
      PAGINATION_PREV: $<HTMLButtonElement>("#pagination-prev"),
      PAGINATION_NEXT: $<HTMLButtonElement>("#pagination-next"),
      PAGINATION_INPUT: $<HTMLInputElement>("#pagination-input"),
      PAGINATION_INPUT_BUTTON: $<HTMLButtonElement>("#pagination-input-button"),
      SEARCH_TEXT_INPUT: $<HTMLInputElement>("#search-text"),
      SEARCH_BUTTON: $<HTMLButtonElement>("#search-button"),
      CREATURES_BUTTONS: $<HTMLButtonElement>(".creature-edit-entry"),
    };
  }

  private async _disablePaginationButtonIfNeeded() {
    const paginatedCreatures = await this._getCreatures();

    this.DOM_ELEMENTS.PAGINATION_PREV.prop("disabled", this.currentPage <= 0);

    this.DOM_ELEMENTS.PAGINATION_NEXT.prop(
      "disabled",
      this.currentPage >= paginatedCreatures.pages - 1
    );
  }

  private _getGoToPageInputValue(): number {
    const inputValue = this.DOM_ELEMENTS.PAGINATION_INPUT.val();
    const value = Number(inputValue);

    if (isNaN(value) || value % 1 > 0) return 0;
    return value;
  }

  private _setSearchTextToCurrentValue() {
    const { SEARCH_TEXT_INPUT } = this.DOM_ELEMENTS;
    SEARCH_TEXT_INPUT.prop("value", this.search.text.value || "");
  }

  // ======================================
  // Private Event Methods
  // ======================================

  private _onClickNext(event: JQuery.ClickEvent<HTMLButtonElement>) {
    this.currentPage += 1;
    this.render();
  }

  private _onClickPrev(event: JQuery.ClickEvent<HTMLButtonElement>) {
    this.currentPage -= 1;
    this.render();
  }

  private async _onClickGoToPage(event: JQuery.ClickEvent<HTMLButtonElement>) {
    const paginatedCreatures = await this._getCreatures();

    this.currentPage = clamp(
      0,
      paginatedCreatures.pages - 1,
      this._getGoToPageInputValue() - 1
    );

    this.render();
  }

  private _onClickSearch(event: JQuery.ClickEvent<HTMLButtonElement>) {
    const { SEARCH_TEXT_INPUT } = this.DOM_ELEMENTS;
    const text = SEARCH_TEXT_INPUT.val();

    if (typeof text !== "string") return;

    this.search.text.value = text;
    this.currentPage = 0;

    this.render();
  }

  private async _onClickEditCreatureEntry(
    event: JQuery.ClickEvent<HTMLButtonElement>
  ) {
    const trackers = await Data.UserCreaturesTrackingDataCollection[
      (game as Game).user!.id
    ]!.getData();

    const creatureId = Number(event.target.dataset.creatureId);
    const creature = await this._findCreatureById(creatureId);

    if (!creature) return;

    this.editCreatureApp.creature = creature;
    this.editCreatureApp.initialStatus =
      trackers[creature.id]?.status || "not-seen";
    this.editCreatureApp.render(true);
  }
}
