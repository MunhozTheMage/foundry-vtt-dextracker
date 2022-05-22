import { JSONUploader } from "../utils/jsonUploader";
import DextrackerUtils from "../utils";
import * as TG from "@gabrielurbina/type-guard";
import { groupBy, range, times } from "rambda";

type CreatureObject = { id: number; name: string; image: string };

export type CreaturesData = {
  currentId: number;
  creatures: CreatureObject[];
};

type CreaturesImportData = {
  creatures: Omit<CreatureObject, "id">[];
};

const isCreatureObject = TG.ObjectOf<CreatureObject>({
  id: TG.isNumber,
  name: TG.isString,
  image: TG.isString,
});

const isCreatureData = TG.ObjectOf<CreaturesData>({
  currentId: TG.isNumber,
  creatures: TG.ArrayOf([isCreatureObject]),
});

export class Creatures {
  private uploader: JSONUploader<CreaturesData>;

  constructor({ baseDir }: { baseDir: string }) {
    this.uploader = new JSONUploader({
      fileName: "creatures.json",
      path: `${baseDir}`,
    });
  }

  public async init() {
    await this.uploader.init();
    await this._createFileIfNotPresent();
  }

  public async getCreatures() {
    const data = await this.uploader.getJsonData();

    if (!isCreatureData(data)) {
      console.log(data);
      throw new Error("Invalid creatures data");
    }

    return data;
  }

  public async importFromObject(
    data: CreaturesImportData,
    { overwrite = true } = {}
  ) {
    const currentData = await this.getCreatures();
    let currentId = overwrite ? 0 : currentData.currentId;

    const importedCreatures: CreaturesData["creatures"] = data.creatures.map(
      (creature) => ({
        ...creature,
        id: currentId++,
      })
    );

    const newObject: CreaturesData = {
      currentId,
      creatures: overwrite
        ? importedCreatures
        : { ...currentData.creatures, ...importedCreatures },
    };

    await this._setCreatures(newObject);
    return newObject;
  }

  public async exportCurrentData(): Promise<string> {
    const currentData = await this.getCreatures();

    const inputFormatData: CreaturesImportData = {
      creatures: currentData.creatures.map((creature) => ({
        name: creature.name,
        image: creature.image,
      })),
    };

    return JSON.stringify(inputFormatData);
  }

  public async getPaginatedCreatures(amountPerPage = 15) {
    const { creatures } = await this.getCreatures();
    const pages = Math.ceil(creatures.length / amountPerPage);

    const paginatedCreatures = times(
      (i) =>
        range(i * amountPerPage, i * amountPerPage + amountPerPage).map(
          (i) => creatures[i]!
        ),
      pages
    );

    return {
      pages,
      paginatedCreatures,
    };
  }

  private async _setCreatures(creatures: CreaturesData) {
    this.uploader.upload(creatures);
  }

  private async _createFileIfNotPresent() {
    const fileExists = await DextrackerUtils.checkIfFileExists(
      this.uploader.source,
      this.uploader.path,
      this.uploader.fileName
    );

    if (fileExists) return;

    const defaultData: CreaturesData = {
      currentId: 0,
      creatures: [],
    };

    await this.uploader.upload(defaultData);
  }
}
