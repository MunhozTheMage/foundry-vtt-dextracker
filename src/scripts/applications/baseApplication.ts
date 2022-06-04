import { DextrackerGlobal } from "../utils/global";

export class BaseApplication<
  T extends ApplicationOptions = ApplicationOptions
> extends Application<T> {
  render(...params: Parameters<Application<T>["render"]>) {
    DextrackerGlobal.runIfLoaded(() => super.render(...params));
  }
}
