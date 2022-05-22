import { PickAsRequiredOrOptional } from "../types";
import DextrackerUtils from "./index";

export class JSONUploader<T> {
  fileName: string;
  path: string;
  source: FilePicker.SourceType;

  constructor({
    fileName,
    path,
    source = "data",
  }: PickAsRequiredOrOptional<JSONUploader<T>, "fileName" | "path", "source">) {
    this.fileName = fileName;
    this.path = path;
    this.source = source;
  }

  public async init() {
    await this._ensureDirectoryExists();
  }

  public async upload(data: T) {
    const jsonData = JSON.stringify(data);

    const file = new File([jsonData], this.fileName, {
      type: "application/json",
    });

    const response = await FilePicker.upload(this.source, this.path, file);

    if (!response || !("path" in response) || !response.path) {
      throw new Error(`Error while uploading file: ${this.fileName}`);
    }

    console.log(response);
  }

  public async getJsonData() {
    const request = await fetch(`${this.path}/${this.fileName}`);
    const data = await request.json();
    return data;
  }

  // ===============================================
  // Private methods
  // ===============================================

  private async _ensureDirectoryExists() {
    DextrackerUtils.ensureDirectoryExists(this.source, this.path);
  }
}
