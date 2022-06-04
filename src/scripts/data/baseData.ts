import DextrackerUtils from "../utils";
import { JSONUploader } from "../utils/jsonUploader";

export default class BaseData<T> {
  protected uploader: JSONUploader<T>;

  constructor({ baseDir, fileName }: { baseDir: string; fileName: string }) {
    this.uploader = new JSONUploader({
      fileName,
      path: baseDir,
    });
  }

  public async init() {
    await this.uploader.init();
    await this._createFileIfNotPresent();
  }

  public get defaultData(): T {
    return {} as T;
  }

  public async getData(): Promise<T> {
    const data = await this.uploader.getJsonData();
    return data;
  }

  private async _createFileIfNotPresent() {
    const fileExists = await DextrackerUtils.checkIfFileExists(
      this.uploader.source,
      this.uploader.path,
      this.uploader.fileName
    );

    if (fileExists) return;

    await this.uploader.upload(this.defaultData);
  }
}
