import { Creatures } from "./creatures";

export abstract class Data {
  static CreaturesData: Creatures;

  public static async init(baseDir: string) {
    Data.CreaturesData = new Creatures({ baseDir });
    await Data.CreaturesData.init();
  }
}
