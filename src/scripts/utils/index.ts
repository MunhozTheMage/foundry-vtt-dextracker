export default class DextrackerUtils {
  public static log(text: string): void {
    console.log(`DexTracker | ${text}`);
  }

  public static createSceneControlButton(
    sceneControlContainer: SceneControl,
    newTool: SceneControlTool
  ): void {
    sceneControlContainer.tools.push(newTool);
  }

  public static async ensureDirectoryExists(
    source: FilePicker.SourceType,
    path: string
  ): Promise<FilePicker.BrowseResult> {
    try {
      const foundFolder = await FilePicker.browse(source, path);
      return foundFolder;
    } catch {
      DextrackerUtils.log(`Created directory: ${path}`);
      await FilePicker.createDirectory(source, path);

      const createdFolder = await FilePicker.browse(source, path);
      return createdFolder;
    }
  }

  public static async checkIfFileExists(
    source: FilePicker.SourceType,
    path: string,
    fileName: string
  ): Promise<boolean> {
    const dir = await FilePicker.browse(source, path);

    return dir.files
      .map((file) => file.split("/").pop())
      .some((currentFileName) => fileName === currentFileName);
  }

  public static saveFileLocaly(
    contents: BlobPart[],
    type: BlobPropertyBag["type"],
    fileName: string
  ) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(contents, { type }));
    a.download = fileName;
    a.click();
  }

  public static async loadLocalFile(file: Blob) {
    const reader = new FileReader();

    const readFilePromise = new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
    });

    reader.readAsText(file);
    await readFilePromise;

    return reader.result as string;
  }
}

export * from "./constants";
