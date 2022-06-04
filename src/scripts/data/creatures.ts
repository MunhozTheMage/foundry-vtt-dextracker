import { JSONUploader } from "../utils/jsonUploader";
import DextrackerUtils from "../utils";
import * as TG from "@gabrielurbina/type-guard";
import { filter, range, times } from "rambda";
import BaseData from "./baseData";

export type CreatureObject = { id: number; name: string; image: string };

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

export class Creatures extends BaseData<CreaturesData> {
  constructor({ baseDir }: { baseDir: string }) {
    super({
      fileName: "creatures.json",
      baseDir,
    });
  }

  get defaultData(): CreaturesData {
    return { currentId: 0, creatures: [] };
  }

  public async getData() {
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
    const currentData = await this.getData();
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
    const currentData = await this.getData();

    const inputFormatData: CreaturesImportData = {
      creatures: currentData.creatures.map((creature) => ({
        name: creature.name,
        image: creature.image,
      })),
    };

    return JSON.stringify(inputFormatData);
  }

  public paginateCreatures(creatures: CreatureObject[], amountPerPage = 15) {
    const pages = Math.ceil(creatures.length / amountPerPage);

    const paginatedCreatures = times(
      (i) =>
        filter<CreatureObject>(
          Boolean,
          range(i * amountPerPage, i * amountPerPage + amountPerPage).map(
            (i) => creatures[i]!
          )
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
}
